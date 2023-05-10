import  {Schema, model, models} from "mongoose";

const PunSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  pun: {
    type: String,
    required: [true, "Pun is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

const Pun = models.Pun ||  model('Pun', PunSchema);
export default Pun;