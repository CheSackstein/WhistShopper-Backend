const dbName = "pets";

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection named "users"
    const pets_collection = db.collection("pets");
 
    let petDocument = {
      type: "Golden Retreiver",
      name: "Goldy",
      status: "Adopted",
      picture: "url123",
      height: "12cm",
      weight: "10kgs",
      color: "Grey",
      bio: "Super cute, friendly and woofs along to any love song",
      HypoAllergenic: "Yes",
      Restrictions: "None",
      Breed: "Schnauzer",
    };
  

    newUserDB = await pets_collection.insertOne(petDocument);
    console.log(newUserDB);    
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);