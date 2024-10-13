import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import InfoCard from "../components/BoxHome";
import { useCheckSession } from "../hooks/useCheckSession";
import { useAuthStore } from "../store/authStore";
import { urlEncode } from "../utils/urlEncode";

export default function HomeScreen({ navigation }) {
  useCheckSession();
  const [data, setData] = useState(null);
  const [sales, setDataSale] = useState(null);
  const [buys, setDataBuys] = useState(null);

  const [API_SRC, token] = useAuthStore((state) => [
    state.API_SRC,
    state.token,
  ]);

  const getData = async () => {
    try {
      const res = await fetch(API_SRC + "?url=home&cliente", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const res_1 = await fetch(API_SRC + "?url=home&resumen=venta&fecha=dia", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const res_2 = await fetch(API_SRC + "?url=home&resumen=compra&fecha=dia", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        compras: "lalo",
        opcionC: "hoy",
      })

      const res_json = await res.json();
      const res_json_sale = await res_1.json();
      const res_json_buys = await res_2.json();
      setData(res_json);
      setDataSale(res_json_sale);
      setDataBuys(res_json_buys);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView className="w-full bg-theme-background">
      <SafeAreaView className="flex items-center gap-5">
        <InfoCard
          title="Ventas |"
          subtitle="día"
          iconName="currency-usd"
          number={
            sales ? sales.resultado : <ActivityIndicator animating={true} />
          }
        />

        <InfoCard
          title="Compras |"
          subtitle="día"
          iconName="cart-outline"
          number={
            buys ? buys.resultado : <ActivityIndicator animating={true} />
          }
        />

        <InfoCard
          title="Productos"
          iconName="pill"
          number={data ? data.producto : <ActivityIndicator animating={true} />}
        />

        <InfoCard
          title="Usuarios"
          iconName="account-tie"
          number={data ? data.usuario : <ActivityIndicator animating={true} />}
        />

        <InfoCard
          title="Proveedores"
          iconName="bank"
          number={
            data ? data.proveedor : <ActivityIndicator animating={true} />
          }
        />

        <InfoCard
          title="Personal"
          iconName="account-supervisor"
          number={data ? data.personal : <ActivityIndicator animating={true} />}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
