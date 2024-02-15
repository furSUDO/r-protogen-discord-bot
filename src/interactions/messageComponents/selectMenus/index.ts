import { BaseMessageComponent } from "../base";
import { ModContactReportSM } from "./modContactReportSM";
import { ModContactWizardSelectMenu } from "./modContactWizardSelect";

export const SelectMenus: Array<BaseMessageComponent> = [
    new ModContactWizardSelectMenu,
    new ModContactReportSM
]