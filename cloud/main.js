const parseSquad = async (squad) => {
  const host = squad.get("host") ? await squad.get("host").fetch() : null;
  const guestObjects = squad.get("guests") ? await Promise.all(squad.get("guests").map(guest => {
    if (guest) {
      return guest.fetch()
    } else {
      return null
    }
  })) : [];

  const guests = guestObjects.map(guest => {
    return !!guest ? ({ username: guest.get("username"), objectId: guest.id }) : null;
  });




  return {
    objectId: squad.id,
    host: host ? { username: host.get("username"), objectId: host.id } : null,
    friendCode: squad.get("friendCode"),
    guests: guests,
    preference: squad.get("preference").toJSON(),
    status: squad.get("status")
  };
}

const savePreference = async (preferenceData) => {
  let preference;
  const Preference = Parse.Object.extend("Preference");

  if (preferenceData.objectId) {
    preference = await new Parse.Query(Preference).get(preferenceData.objectId, { useMasterKey: true });
  } else {
    preference = new Preference();
  }

  preference.set("difficulties", preferenceData.difficulties);
  preference.set("focus", preferenceData.focus);
  preference.set("intensity", preferenceData.intensity);
  preference.set("mic", preferenceData.mic);
  preference.set("enemies", preferenceData.enemies);

  await preference.save(null, { useMasterKey: true });
  return preference.toPointer();
};

Parse.Cloud.define("saveSquad", async (request) => {
  const squadData = request.params;
  const preferencePointer = await savePreference(squadData.preference);

  const Squad = Parse.Object.extend("Squad");
  let squad;
  if (squadData.objectId) {
    squad = await new Parse.Query(Squad).get(squadData.objectId, { useMasterKey: true });
  } else {
    squad = new Squad();
  }

  const guestPointers = squadData.guests.map(guestId => guestId ? Parse.Object.extend("_User").createWithoutData(guestId) : null);
  const hostPointer = Parse.Object.extend("_User").createWithoutData(squadData.host.objectId);

  squad.set("host", hostPointer);
  squad.set("friendCode", squadData.friendCode);
  squad.set("guests", guestPointers);
  squad.set("status", squadData.status);
  squad.set("preference", preferencePointer);

  // return squad.toJSON();
  await squad.save(null, { useMasterKey: true });
});

Parse.Cloud.define("fetchSquads", async (request) => {
  const { difficulties, focus, intensity, mic, enemies } = request.params;

  const Squad = Parse.Object.extend("Squad");
  const squadQuery = new Parse.Query(Squad);
  squadQuery.equalTo("status", "open");
  squadQuery.include(["preference", "host", "guests"]);

  const openSquads = await squadQuery.find({ useMasterKey: true });

  const matchingSquads = openSquads.filter((squad) => {
    const pref = squad.get("preference");
    const matchesDifficulties = difficulties ? difficulties.some(difficulty => pref.get("difficulties").includes(difficulty)) : true;
    const matchesFocus = focus ? pref.get("focus") === focus : true;
    const matchesIntensity = intensity ? pref.get("intensity") === intensity : true;
    const matchesMic = mic !== undefined ? pref.get("mic") === mic : true;
    const matchesEnemies = enemies ? enemies.every(enemy => pref.get("enemies").includes(enemy)) && enemies.length === pref.get("enemies").length : true;

    return matchesDifficulties && matchesFocus && matchesIntensity && matchesMic && matchesEnemies;
  });

  const result = await Promise.all(matchingSquads.map(async (squad) => {
    return await parseSquad(squad);
  }));

  return result;
});

Parse.Cloud.define("joinSquad", async (request) => {
  const { squadId, userId } = request.params;
  const Squad = Parse.Object.extend("Squad");
  const squadQuery = new Parse.Query(Squad);
  const squad = await squadQuery.get(squadId, { useMasterKey: true });

  if (!squad) {
    throw new Error("Squad not found.");
  }

  const guestPointers = squad.get("guests") || [];

  if (guestPointers.length >= 3) {
    return { error: "Sorry, that squad is now full." };
  }

  const User = Parse.Object.extend("_User");
  let newGuestPointer

  if (userId === null) {
    newGuestPointer = null
  } else {
    newGuestPointer = User.createWithoutData(userId);
  }


  guestPointers.push(newGuestPointer);
  squad.set("guests", guestPointers);

  if (guestPointers.length === 3) {
    squad.set("status", "full");
  }

  await squad.save(null, { useMasterKey: true });

  return { success: "User added to the squad successfully, and status updated if necessary." };
});

Parse.Cloud.define("leaveSquad", async (request) => {
  const { squadId, userId } = request.params;
  const Squad = Parse.Object.extend("Squad");
  const squadQuery = new Parse.Query(Squad);
  const squad = await squadQuery.get(squadId, { useMasterKey: true });

  if (!squad) {
      throw new Error("Squad not found.");
  }

  let guests = squad.get("guests") || [];
  if (!!userId) {
      guests = guests.filter((guest) => {
        return (
          guest === null ||
          guest?.id !== userId
        )
      });
  } else {
      const nullIndex = guests.indexOf(null);
      if (nullIndex > -1) {
        guests.splice(nullIndex, 1);
      }
  }

  squad.set("guests", guests);

  if (guests.length < 3 && squad.get("status") === "full") {
      squad.set("status", "open");
  }

  await squad.save(null, { useMasterKey: true });

  return { success: "Guest removed from the squad successfully, and status updated if necessary." };
});

Parse.Cloud.define("getMySquad", async (request) => {
  const { userId } = request.params;

  const Squad = Parse.Object.extend("Squad");
  const squadQuery = new Parse.Query(Squad);
  const userPointer = Parse.Object.extend("_User").createWithoutData(userId);

  squadQuery.equalTo("host", userPointer);
  squadQuery.include(["preference", "guests"]);

  const squad = await squadQuery.first({ useMasterKey: true });

  if (!squad) {
    return null;
  }

  return await parseSquad(squad);
});