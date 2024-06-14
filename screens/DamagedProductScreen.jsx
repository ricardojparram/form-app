import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Searchbar, Text } from "react-native-paper";
import { useCheckSession } from "../hooks/useCheckSession";
import { useAuthStore } from "../store/authStore";
import { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CustomModal } from "../components/Modal";

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
    const res = await fetch(
      API_SRC + "?url=productoDanado&mostrar=&bitacora=",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res_json = await res.json();
    if (res_json != null) {
      console.log(res_json[0]);
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
    1;
    setPage(0);
  }, [itemsPerPage]);

  const [sortDirectionDate, setSortDirectionDate] = useState("descending");
  const [sortDirectionNum, setSortDirectionNum] = useState("descending");

  const toggleDate = () => {
    const newDirection =
      sortDirectionDate === "descending" ? "ascending" : "descending";
    const sortedData = [...data].sort((a, b) =>
      newDirection === "ascending"
        ? new Date(a?.fecha) - new Date(b?.fecha)
        : new Date(b?.fecha) - new Date(a?.fecha)
    );
    setSortDirectionDate(newDirection);
    setData(sortedData);
  };

  const toggleNum = () => {
    const newDirection =
      sortDirectionNum === "descending" ? "ascending" : "descending";
    const sortedData = [...data].sort((a, b) =>
      newDirection === "ascending"
        ? a?.tipo_movimiento.localeCompare(b?.tipo_movimiento)
        : b?.tipo_movimiento.localeCompare(a?.tipo_movimiento)
    );
    setSortDirectionNum(newDirection);
    setData(sortedData);
  };

  const searchInBar = (text) => {
    const query = normalize(text);
    const filteredData = originalData.filter(
      (row) =>
        row?.num_descargo.toUpperCase().includes(query.toUpperCase()) ||
        row?.fecha.toUpperCase().includes(query.toUpperCase())
    );
    setData(filteredData);
  };

  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const handleGetDetails = (id) => {
    setModalData(getDetails(id, data));
    setVisible(true);
  };
  console.log(data.length);

  return (
    <View style={{ padding: 10 }}>
      <Searchbar
        className="mx-3"
        placeholder="Buscar..."
        onChangeText={(v) => searchInBar(v)}
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title sortDirection={sortDirectionNum} onPress={toggleNum}>
            Numero de descargo
          </DataTable.Title>
          <DataTable.Title
            sortDirection={sortDirectionDate}
            onPress={toggleDate}
          >
            Fecha
          </DataTable.Title>
        </DataTable.Header>

        {data.length >= 1 ? (
          data.slice(from, to).map((item) => (
            <DataTable.Row
              key={item.id}
              onPress={() => handleGetDetails(item.id)}
            >
              <DataTable.Cell>{item.tipo_movimiento}</DataTable.Cell>
              <DataTable.Cell>{item.presentacion_producto}</DataTable.Cell>
              <DataTable.Cell>{item.fecha}</DataTable.Cell>
              <DataTable.Cell>{item.nombre_sede}</DataTable.Cell>
            </DataTable.Row>
          ))
        ) : (
          <Text className="m-auto py-5 drop-shadow-md">
            No se encontró información...
          </Text>
        )}

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
        title={modalData.nombre_sede}
      >
        <View className="pr-4 text-md flex gap-y-2">
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">Usuario: </Text>
            <Text className="font-bold">{modalData?.usuario}</Text>
          </View>
          <Divider />
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">Tipo de movimiento: </Text>
            <Text className="font-bold">{modalData?.tipo_movimiento}</Text>
          </View>
          <Divider />
          <View className="flex flex-row justify-between">
            <Text className="font-bold">Producto: </Text>
            <Text className="font-bold">
              {modalData?.presentacion_producto}
            </Text>
          </View>
          <Divider />
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">Cantidad: </Text>
            <Text className="font-bold">{modalData?.cantidad}</Text>
          </View>
          <Divider />
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">Lote: </Text>
            <Text className="font-bold">{modalData?.producto_lote}</Text>
          </View>
          <Divider />
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">Fecha: </Text>
            <Text className="font-bold">{modalData?.fecha}</Text>
          </View>
          <Divider />
          <View className="flex flex-row justify-evenly">
            <View className="flex flex-row justify-between ">
              <Text className="font-bold">Entrada: </Text>
              <Text className="font-extrabold">
                {modalData?.entrada?.toUpperCase()}
              </Text>
            </View>
            <View className="flex flex-row justify-between ">
              <Text className="font-bold">Salida: </Text>
              <Text className="font-extrabold">
                {modalData?.salida?.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

export default function DamagedProductScreen() {
  useCheckSession();
  return (
    <SafeAreaView className="flex-1 items-center bg-theme-background">
      <ScrollView>
        <Table />
      </ScrollView>
    </SafeAreaView>
  );
}
