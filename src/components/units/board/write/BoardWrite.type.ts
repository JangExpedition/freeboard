import { IQuery } from "@/commons/types/generated/types";

export interface ISubmitButtonProps {
  disabled: boolean;
}

export interface BoardWriteProps {
  isEdit: boolean;
  data?: Pick<IQuery, "fetchBoard">;
}
