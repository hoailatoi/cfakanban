export type IServer = {
  base: string;
  hiro: string;
  dev_khai: string;
};

export type IHost = {
  vi: IServer;
  en: IServer;
  cn: IServer;
};

const iJson: IHost = {
  vi: {
    base: "http://10.20.226.102:1603/feservices/api/v1/",
    hiro: "https://localhost:1603/api/v1/",
    dev_khai: "https://localhost:1603/api/v1/"
  },
  en: {
    base: "http://10.20.226.102:1603/feservices/api/v1/",
    hiro: "https://localhost:1603/api/v1/",
    dev_khai: "https://localhost:1603/api/v1/"
  },
  cn: {
    base: "http://10.20.226.102:1603/feservices/api/v1/",
    hiro: "https://localhost:1603/api/v1/",
    dev_khai: "https://localhost:1603/api/v1/"
  },
};

type Server = "base" | "hiro";

const SERVER: Server = "base";

export const getbase = (i: keyof IHost): string => iJson[i][SERVER];

export const url = {
  QCCFADashboardGetData: (internal: keyof IHost) => `${getbase(internal)}cfadashboard/getcfadashboarddata`,
}
