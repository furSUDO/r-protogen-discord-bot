import { BaseMessageComponent } from "../base";
import { Custom } from "./custom";
import { ModContactReportSM } from "./modContactReportSM";
import { ModContactWizardSelectMenu } from "./modContactWizardSelect";

export const SelectMenus: Array<BaseMessageComponent> = [
    new Custom,
    new ModContactWizardSelectMenu,
    new ModContactReportSM,
]