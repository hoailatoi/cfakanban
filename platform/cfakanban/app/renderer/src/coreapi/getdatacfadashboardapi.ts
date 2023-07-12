import { IHost, url } from "../shared";
import { _f_Post_Query } from "../shared/fetchType";

export const getdatacfadashboardapi = {
  GetCFADashboardData: (
    internal: keyof IHost,
    areaCode: string
  ) =>
    _f_Post_Query(url.QCCFADashboardGetData(internal), {
      areaCode,
    }),
};
