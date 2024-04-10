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
  return preference;
};

Parse.Cloud.define("saveSquad", async (request) => {
  try {
    const squadData = request.params;
    const preference = await savePreference(squadData.preference);

    const Squad = Parse.Object.extend("Squad");
    let squad = squadData.objectId ? await new Parse.Query(Squad).get(squadData.objectId, { useMasterKey: true }) : new Squad();

    const guestPointers = squadData.guests.map(guestId => Parse.Object.extend("_User").createWithoutData(guestId));
    const hostPointer = Parse.Object.extend("_User").createWithoutData(squadData.host);

    squad.set("host", hostPointer);
    squad.set("friendCode", squadData.friendCode);
    squad.set("guests", guestPointers);
    squad.set("status", squadData.status);
    squad.set("preference", preference);

    await squad.save(null, { useMasterKey: true });
    return squad;
  } catch (error) {
    console.trace('saveSquad error', error);
    return {error: `saveSquad: ${error.message}`};
  }
});



Parse.Cloud.define("fetchSquads", async (request) => {
  const { difficulties, focus, intensity, mic, enemies } = request.params;


  const Squad = Parse.Object.extend("Squad");
  const squadQuery = new Parse.Query(Squad);
  squadQuery.equalTo("status", "open");
  

  squadQuery.include("preference");
  
  const openSquads = await squadQuery.find({ useMasterKey: true });
  

  const matchingSquads = openSquads.filter((squad) => {
    const pref = squad.get("preference");

  
    const matchesDifficulties = difficulties.some(difficulty => pref.get("difficulties").includes(difficulty));
    const matchesFocus = pref.get("focus") === focus;
    const matchesIntensity = pref.get("intensity") === intensity;
    const matchesMic = pref.get("mic") === mic;
    const matchesEnemies = enemies.every(enemy => pref.get("enemies").includes(enemy)) && enemies.length === pref.get("enemies").length;

    return matchesDifficulties && matchesFocus && matchesIntensity && matchesMic && matchesEnemies;
  });


  const result = matchingSquads.map((squad) => {
    return {
      objectId: squad.id,
      host: squad.get("host"),
      friendCode: squad.get("friendCode"),
      guests: squad.get("guests"),
      preference: squad.get("preference").toJSON(),
      status: squad.get("status")
    };
  });

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

  const guests = squad.get("guests") || [];
  if (guests.length >= 3) {
    return { error: "Sorry, that squad is now full." };
  }

  const User = Parse.Object.extend("_User");
  const userQuery = new Parse.Query(User);
  const user = await userQuery.get(userId, { useMasterKey: true });

  if (!user) {
    throw new Error("User not found.");
  }

  const username = user.get("username");
  guests.push(username);
  squad.set("guests", guests);

  if (guests.length === 3) {
    squad.set("status", "full");
  }

  await squad.save(null, { useMasterKey: true });

  return { success: "User added to the squad successfully, and status updated if necessary." };
});

Parse.Cloud.define("getMySquad", async (request) => {
  const { userId } = request.params;

  const User = Parse.Object.extend("_User");
  const userQuery = new Parse.Query(User);
  const user = await userQuery.get(userId, { useMasterKey: true });
  if (!user) {
    throw new Error("User not found.");
  }
  const username = user.get("username");
  
  console.log(':~: getMySquad username', username)  
  const Squad = Parse.Object.extend("Squad");
  const squadQuery = new Parse.Query(Squad);
  squadQuery.equalTo("host", username); 

  squadQuery.include("preference"); 

  const squad = await squadQuery.first({ useMasterKey: true }); 

  console.log(':~: getMySquad squad', squad)
  if (!squad) {
    return null;
  }
  
  return {...squad.toJSON(), objectId: squad.id};
});
