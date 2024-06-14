import { SafeAreaView } from "react-native-safe-area-context";
import {
  DataTable,
  ActivityIndicator,
  Divider,
  Searchbar,
  Text,
} from "react-native-paper";
import { useCheckSession } from "../hooks/useCheckSession";
import { useAuthStore } from "../store/authStore";
import { useState, useEffect } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CustomModal } from "../components/Modal";

const normalize = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const Table = ({ navigation }) => {
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
      setData(res_json);
      setOriginalData(res_json);
    }
  };
  const getDetails = async (id) => {
    const res = await fetch(API_SRC + "?url=productoDanado&detalle=&id=" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
    return res;
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

  const [modalData, setModalData] = useState({
    title: "",
    visible: false,
    data: [],
  });
  const handleGetDetails = async (id, title) => {
    setModalData((state) => ({ data: [], title: title, visible: true }));
    const res = await getDetails(id);
    setModalData((state) => ({ ...state, data: res }));
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
              key={item.id_descargo}
              onPress={() =>
                handleGetDetails(item.id_descargo, item.num_descargo)
              }
            >
              <DataTable.Cell>{item.num_descargo}</DataTable.Cell>
              <DataTable.Cell>{item.fecha}</DataTable.Cell>
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
        visible={modalData.visible}
        onDismiss={() =>
          setModalData((state) => ({ ...state, visible: false }))
        }
        title={"Numero de decargo: " + modalData.title}
      >
        <View className="pr-4 text-md flex ">
          <Text className="text-lg mb-2">Productos: </Text>
          {modalData.data.length >= 1 ? (
            modalData.data.map((item, i) => (
              <>
                <View className="flex flex-row justify-between">
                  <Text className="font-extrabold">
                    {item?.presentacion_producto}
                  </Text>
                  <Text className="font-extrabold">{item?.cantidad}</Text>
                  <Text className="font-extrabold">
                    {item?.fecha_vencimiento}
                  </Text>
                </View>
                {i != modalData.data.length - 1 && <Divider />}
              </>
            ))
          ) : (
            <ActivityIndicator animating={true} />
          )}
        </View>
      </CustomModal>
    </View>
  );
};

export default function DamagedProductScreen({ navigation }) {
  useCheckSession();
  return (
    <SafeAreaView className="flex-1 items-center bg-theme-background">
      <ScrollView>
        <Table navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}
