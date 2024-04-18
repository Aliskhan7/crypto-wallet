import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { fakeFetchCrypto, fetchAssets } from "../api";
import { percentDifference } from "../until";
import { IAssets, ICoin } from "../types.ts";

interface ICryptoContext {
  crypto: ICoin[];
  assets: IAssets[];
  loading: boolean;
}
const defaultContext: ICryptoContext = {
  assets: [],
  crypto: [],
  loading: false,
};

const CryptoContext = createContext<ICryptoContext>(defaultContext);

export const CryptoContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [crypto, setCrypto] = useState<ICoin[]>([]);
  const [assets, setAssets] = useState<IAssets[]>([]);

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fetchAssets();

      setAssets(
        assets.map((asset: IAssets) => {
          const coin = result.find((c: ICoin) => c.id === asset.id);
          return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
          };
        }),
      );
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);
  return (
    <CryptoContext.Provider value={{ loading, crypto, assets }}>
      {children}
    </CryptoContext.Provider>
  );
};
export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
