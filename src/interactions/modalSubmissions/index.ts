import { BaseModalSubmission } from "./base";
import { MANModMail } from "./maModMail";


import { MPSubmit } from "./marketplaceVerificationModal";
import { MCNModMail } from "./mcModmail";



export const ModalSubmissions: Array<BaseModalSubmission> = [
    // @ts-ignore
    new MPSubmit,
    new MCNModMail,
    new MANModMail
]