import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import InfoCard from "../components/BoxHome";
import { useCheckSession } from "../hooks/useCheckSession";
import { useAuthStore } from "../store/authStore";

export default function HomeScreen({ navigation }) {
  useCheckSession();
  const [data, setData] = useState(null);
  const [sales, setDataSale] = useState(null);
  const [buys, setDataBuys] = useState(null);
  const [donations, setDonations] = useState(null);

  const [API_SRC, token] = useAuthStore((state) => [
    state.API_SRC,
    state.token,
  ]);

  const getData = async () => {
    try {
      const resumen = await fetch(API_SRC + "?url=home&cliente", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
      const ventas = await fetch(
        API_SRC + "?url=home&resumen=venta&fecha=dia",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      ).then((res) => res.json());

      const compras = await fetch(
        API_SRC + "?url=home&resumen=compra&fecha=dia",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      ).then((res) => res.json());

      const donaciones_pacientes = await fetch(
        API_SRC + "?url=home&resumen=donativo_pac&fecha=dia",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      ).then((res) => res.json())

      const donaciones_personal = await fetch(
        API_SRC + "?url=home&resumen=donativo_per&fecha=dia",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      ).then((res) => res.json());

      const donaciones_intituciones = await fetch(
        API_SRC + "?url=home&resumen=donativo_int&fecha=dia",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      ).then((res) => res.json())

      setData(resumen);
      setDataSale(ventas);
      setDataBuys(compras);
      setDonations({
        personal: donaciones_personal,
        pacientes: donaciones_pacientes,
        intituciones: donaciones_intituciones,
      });
      console.log(donations)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView className="w-full bg-theme-background">
      <SafeAreaView className="p-5">
        <InfoCard
          title="Donaciones pacientes |"
          subtitle="día"
          iconName="gift-outline"
          number={
            donations ? (
              donations.pacientes.resultado
            ) : (
              <ActivityIndicator animating={true} />
            )
          }
        />

        <InfoCard
          title="Donaciones personal |"
          subtitle="día"
          iconName="hand-coin-outline"
          number={
            donations ? (
              donations.personal.resultado
            ) : (
              <ActivityIndicator animating={true} />
            )
          }
        />

        <InfoCard
          title="Donaciones instituciones |"
          subtitle="día"
          iconName="office-building"
          number={
            donations ? (
              donations.intituciones.resultado
            ) : (
              <ActivityIndicator animating={true} />
            )
          }
        />

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
