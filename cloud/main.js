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
  let squadQuery = new Parse.Query(Squad);
  squadQuery.equalTo("friendCode", squadData.friendCode);
  let squad = await squadQuery.first({ useMasterKey: true });

  if (!squad) {
    squad = new Squad();
    squad.set("host", squadData.host);
    squad.set("friendCode", squadData.friendCode);
    squad.set("guests", squadData.guests);
  }

  squad.set("preference", preferencePointer);

  await squad.save(null, { useMasterKey: true });
});
