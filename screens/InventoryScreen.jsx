import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Searchbar, Text } from "react-native-paper";
import { useCheckSession } from "../hooks/useCheckSession";
import { useAuthStore } from "../store/authStore";
import { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CustomModal } from "../components/Modal";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const normalize = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const getDetails = (id, data) => {
  const [res] = data.filter((row) => row.id == id);
  return res;
};

const Table = () => {
  const [API_SRC, token] = useAuthStore((state) => [
    state.API_SRC,
    state.token,
  ]);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const getData = async () => {
    const res = await fetch(API_SRC + "?url=inventario&mostrar=&bitacora=", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res_json = await res.json();
    if (res_json != null) {
      setData(res_json);
      setOriginalData(res_json);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10, 15, 20, 25]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);

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
    const newDirection =
      sortDirectionName === "descending" ? "ascending" : "descending";
    const sortedData = [...data].sort((a, b) =>
      newDirection === "ascending"
        ? a?.presentacion_producto.localeCompare(b?.presentacion_producto)
        : b?.presentacion_producto.localeCompare(a?.presentacion_producto)
    );
    setSortDirectionName(newDirection);
    setData(sortedData);
  };

  const toggleDate = () => {
    const newDirection =
      sortDirectionDate === "descending" ? "ascending" : "descending";
    const sortedData = [...data].sort((a, b) =>
      newDirection === "ascending"
        ? new Date(a?.fecha_vencimiento) - new Date(b?.fecha_vencimiento)
        : new Date(b?.fecha_vencimiento) - new Date(a?.fecha_vencimiento)
    );
    setSortDirectionDate(newDirection);
    setData(sortedData);
  };

  const toggleInventory = () => {
    const newDirection =
      sortDirectionInventory === "descending" ? "ascending" : "descending";
    const sortedData = [...data].sort((a, b) =>
      newDirection === "ascending"
        ? a?.inventario - b?.inventario
        : b?.inventario - a?.inventario
    );
    setSortDirectionInventory(newDirection);
    setData(sortedData);
  };

  const searchInBar = (text) => {
    const query = normalize(text);
    const filteredData = originalData.filter((row) =>
      row?.presentacion_producto.toUpperCase().includes(query.toUpperCase())
    );
    setData(filteredData);
  };

  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const handleGetDetails = (id) => {
    setModalData(getDetails(id, data));
    setVisible(true);
  };

  return (
    <View style={{ padding: 10 }}>
      <Searchbar
        className="mx-3"
        placeholder="Buscar..."
        onChangeText={(v) => searchInBar(v)}
      />
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
          <DataTable.Row
            key={item.id}
            onPress={() => handleGetDetails(item.id)}
          >
            <DataTable.Cell>{item.presentacion_producto}</DataTable.Cell>
            <DataTable.Cell>
              {item.presentacion_peso + " " + item.medida}
            </DataTable.Cell>
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
          onItemsPerPageChange={setItemsPerPage}
          showFastPaginationControls
          selectPageDropdownLabel={"Filas por pagina"}
        />
      </DataTable>
      <CustomModal
        visible={visible}
        onDismiss={() => setVisible(false)}
        title={modalData.presentacion_producto}
      >
        <View className="pr-4 text-md flex gap-y-2">
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">Lote: </Text>
            <Text className="font-bold">{modalData?.lote}</Text>
          </View>
          <Divider />
          <View className="flex flex-row justify-between">
            <Text className="font-bold">Inventario: </Text>
            <Text className="font-bold">{modalData?.inventario}</Text>
          </View>
          <Divider />
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">Fecha de vencimiento: </Text>
            <Text className="font-bold">{modalData?.fecha_vencimiento}</Text>
          </View>
          <Divider />
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">Clase: </Text>
            <Text className="font-bold">{modalData?.clase}</Text>
          </View>
          <Divider />
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">Tipo: </Text>
            <Text className="font-bold">{modalData?.tipo}</Text>
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

export default function InventoryScreen() {
  useCheckSession();
  return (
    <SafeAreaView className="flex-1 items-center bg-theme-background">
      <ScrollView>
        <Table />
      </ScrollView>
    </SafeAreaView>
  );
}
