import { useContext } from "react";
import { AppContext } from "./context";
import { IAppProvider } from "../types/context";

export default function useAppProvider() {
  const uAppProvider = useContext(AppContext) as IAppProvider;
  return uAppProvider;
}
