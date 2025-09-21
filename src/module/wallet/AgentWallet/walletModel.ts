import { model, Schema } from "mongoose";
import { IAmount } from "./walletInterface";

// export interface IAmount extends Document  {
//     username:string,
//     balance:number;
// }

const AmountSchema = new Schema<IAmount>({
    username: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
}, {
    timestamps: true
})

export const Amount = model<IAmount>("Amount", AmountSchema)
