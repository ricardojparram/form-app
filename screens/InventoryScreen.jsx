import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-paper";
import { useCheckSession } from "../hooks/useCheckSession";
import { useAuthStore } from "../store/authStore";
import { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import { View } from "react-native";

const normalize = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
const buscar = () =>
  [{ name: "ASD" }, { name: "BII" }, { name: "ZUUU" }].filter(
    (row) => row.name.toUpperCase().indexOf(busqueda.toUpperCase()) > -1
  );
const Table = () => {
  const [API_SRC, token] = useAuthStore((state) => [
    state.API_SRC,
    state.token,
  ]);
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await fetch(API_SRC + "?url=inventario&mostrar=&bitacora=", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res_json = await res.json();
    if (res_json != null) {
      setData(res_json);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([5, 10, 15, 20]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  const [sortDirectionName, setSortDirectionName] = useState("descending");
  const [sortDirectionDate, setSortDirectionDate] = useState("descending");
  const [sortDirectionInventory, setSortDirectionInventory] =
    useState("descending");
  const toggleName = () => {
    if (sortDirectionName == "descending") {
      setSortDirectionName("ascending");
      setData(
        data.sort((a, b) =>
          a?.presentacion_producto < b?.presentacion_producto ? -1 : 1
        )
      );
    } else {
      setSortDirectionName("descending");
      setData(
        data.sort((a, b) =>
          a?.presentacion_producto > b?.presentacion_producto ? -1 : 1
        )
      );
    }
  };
  const toggleDate = () => {
    if (sortDirectionDate == "descending") {
      setSortDirectionDate("ascending");
      setData(
        data.sort(
          (a, b) =>
            new Date(a?.fecha_vencimiento) - new Date(b?.fecha_vencimiento)
        )
      );
    } else {
      setSortDirectionDate("descending");
      setData(
        data.sort((a, b) =>
          a?.presentacion_producto + b?.presentacion_producto ? -1 : 1
        )
      );
    }
  };
  const toggleInventory = () => {
    if (sortDirectionInventory == "descending") {
      setSortDirectionInventory("ascending");
      setData(data.sort((a, b) => (a?.inventario < b?.inventario ? -1 : 1)));
    } else {
      setSortDirectionInventory("descending");
      setData(data.sort((a, b) => (a?.inventario > b?.inventario ? -1 : 1)));
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title
            sortDirection={sortDirectionName}
            onPress={toggleName}
          >
            Producto
          </DataTable.Title>
          <DataTable.Title>Lote</DataTable.Title>
          <DataTable.Title
            sortDirection={sortDirectionInventory}
            onPress={toggleInventory}
          >
            Inventario
          </DataTable.Title>
          <DataTable.Title
            sortDirection={sortDirectionDate}
            onPress={toggleDate}
          >
            Fecha de vencimiento
          </DataTable.Title>
        </DataTable.Header>

        {data.slice(from, to).map((item) => (
          <DataTable.Row key={item.id} onPress={() => console.log(item.id)}>
            <DataTable.Cell>{item.presentacion_producto}</DataTable.Cell>
            <DataTable.Cell>{item.lote}</DataTable.Cell>
            <DataTable.Cell>{item.inventario}</DataTable.Cell>
            <DataTable.Cell>{item.fecha_vencimiento}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(data.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} de ${data.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Filas por pagina"}
        />
      </DataTable>
    </View>
  );
};

export default function InventoryScreen() {
  useCheckSession();

  return (
    <SafeAreaView className="flex-1 items-center justify-center gap-5 bg-theme-background">
      <Text className="text-3xl text-black">Inventario de los productos </Text>
      <Table />
    </SafeAreaView>
  );
}
