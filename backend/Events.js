const { EventModel } = require('./Schema');
const path = require('path');
const fs = require('fs');

const EventDelete = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const delete_event = await EventModel.findByIdAndDelete(id);

    if (delete_event) {
      return res.status(200).send({ message: "The data was successfully deleted" });
    } else {
      return res.status(404).send({ message: "Failed to delete the event" });
    }
  } catch (error) {
    console.log("An error occurred: " + error);
    res.status(500).send({ message: "Server error" });
  }
};

const PostEvents = async (req, res) => {
  const { title, description } = req.body;
  const ImageFile = req.file;
  if(!title || !description || !ImageFile){
     return res.send({message:"no input comming to server check you frontend form"})
  }
  try {
    const saveEventPath = path.join(__dirname, 'events');
    const fileName = Date.now() + '-' + ImageFile.originalname;
    const pathofFile = path.join(saveEventPath, fileName);

    if (!fs.existsSync(saveEventPath)) {
      fs.mkdirSync(saveEventPath, { recursive: true });
    }

    await fs.promises.rename(ImageFile.path, pathofFile);

    const imagebuffer = await fs.promises.readFile(pathofFile);
    const base64 = imagebuffer.toString('base64');

    const eventModel = new EventModel({
      title: title,
      description: description,
      image: base64
    });

    const saveEvent = await eventModel.save();
    if (saveEvent) {
      return res.status(200).send({ message: "The event was posted and saved successfully" });
    } else {
      return res.status(500).send({ message: "Failed to save the event" });
    }
  } catch (error) {
    console.log("An error occurred: " + error);
    res.status(500).send({ message: "Server error" });
  }
};
 const getDatafromEvents=async(req,res)=>{
     try {
        const myeventData=await EventModel.find();
         if(myeventData){
             return res.send({message:myeventData});
         }
     } catch (error) {
         console.log("error are accured during events")
     }
 }

module.exports = { EventDelete, PostEvents ,getDatafromEvents};
