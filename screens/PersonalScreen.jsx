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
  const [res] = data.filter((row) => row.cedula == id);
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
      API_SRC + "?url=personal&mostrar=xd&bitacora=true",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
  const [sortDirectionLastName, setSortDirectionLastName] = useState("descending");
  const [sortDirectionId, setSortDirectionId] = useState("descending");

  const toggleName = () => {
    const newDirection =
      sortDirectionName === "descending" ? "ascending" : "descending";
    const sortedData = [...data].sort((a, b) =>
      newDirection === "ascending"
        ? a?.nombres.localeCompare(b?.nombres)
        : b?.nombres.localeCompare(a?.nombres)
    );
    setSortDirectionName(newDirection);
    setData(sortedData);
  };

  const toggleId = () => {
    const newDirection =
      sortDirectionId === "descending" ? "ascending" : "descending";
    const sortedData = [...data].sort((a, b) =>
      newDirection === "ascending"
        ? a?.cedula.localeCompare(b?.cedula)
        : b?.cedula.localeCompare(a?.cedula)
    );
    setSortDirectionId(newDirection);
    setData(sortedData);
  };

  const toggleLastName = () => {
    const newDirection =
    sortDirectionLastName === "descending" ? "ascending" : "descending";
    const sortedData = [...data].sort((a, b) =>
      newDirection === "ascending"
        ? a?.apellidos.localeCompare(b?.apellidos)
        : b?.apellidos.localeCompare(a?.apellidos)
    );
    setSortDirectionLastName(newDirection);
    setData(sortedData);
  };

  const searchInBar = (text) => {
    const query = normalize(text);
    const filteredData = originalData.filter((row) =>
      row?.cedula.toUpperCase().includes(query.toUpperCase())
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
            sortDirection={sortDirectionId}
            onPress={toggleId}
          >N° Documento
          </DataTable.Title>
          <DataTable.Title
            sortDirection={sortDirectionName}
            onPress={toggleName}
          >Nombre
          </DataTable.Title>
          <DataTable.Title
            sortDirection={sortDirectionLastName}
            onPress={toggleLastName}
          >Apellido
          </DataTable.Title>
        </DataTable.Header>
        {data.length >= 1 ? (
          data.slice(from, to).map((item) => (
            <DataTable.Row
              key={item.cedula}
              onPress={() => handleGetDetails(item.cedula)}
            >
              <DataTable.Cell>{item.cedula}</DataTable.Cell>
              <DataTable.Cell>{item.nombres}</DataTable.Cell>
              <DataTable.Cell>{item.apellidos}</DataTable.Cell>
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
        <CustomModal
        visible={visible}
        onDismiss={() => setVisible(false)}
        title={modalData?.nombres+" "+modalData?.apellidos}
      >
        <View className="pr-4 text-md flex gap-y-2">
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">Cedula: </Text>
            <Text className="">{modalData?.cedula}</Text>
          </View>
          <Divider />
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">Direccion: </Text>
            <Text className="">{modalData?.direccion}</Text>
          </View>
          <Divider />
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">Edad: </Text>
            <Text className="">{modalData?.edad}</Text>
          </View>
          <Divider />
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">Telefono: </Text>
            <Text className="">{modalData?.telefono}</Text>
          </View>
          <Divider />
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">Correo: </Text>
            <Text className="">{modalData?.correo}</Text>
          </View>
          <Divider />
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">Tipo de Empleado: </Text>
            <Text className="">{modalData?.tipo}</Text>
          </View>
          <Divider />
          <View className="flex flex-row justify-between ">
            <Text className="font-bold">Sede: </Text>
            <Text className="">{modalData?.sede}</Text>
          </View>
          <Divider />
        </View>
      </CustomModal>

      </DataTable>
    </View>
  );
};

export default function PersonalScreen() {
  useCheckSession();
  return (
    <SafeAreaView className="flex-1 items-center bg-theme-background">
      <ScrollView>
        <Table />
      </ScrollView>
    </SafeAreaView>
  );
}
