import { SafeAreaView } from "react-native-safe-area-context";
import {
  Divider,
  ActivityIndicator,
  Searchbar,
  Text,
} from "react-native-paper";
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
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const res = await fetch(API_SRC + "?url=donativoPersonal&mostrar=&app=", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(await res.text());
    const res_json = await res.json();
    setLoading(false);
    if (res_json != null) {
      setData(res_json);
      setOriginalData(res_json);
    }
  };

  const getDetails = async (id) => {
    const res = await fetch(
      API_SRC + "?url=donativoPersonal&detalleD=&id=" + id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());
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

  const [sortDirectionName, setSortDirectionName] = useState("descending");
  const [sortDirectionDate, setSortDirectionDate] = useState("descending");
  const [sortDirectionId, setSortDirectionId] = useState("descending");

  const toggleName = () => {
    const newDirection =
      sortDirectionName === "descending" ? "ascending" : "descending";
    const sortedData = [...data].sort((a, b) =>
      newDirection === "ascending"
        ? a?.beneficiario.localeCompare(b?.beneficiario)
        : b?.beneficiario.localeCompare(a?.beneficiario)
    );
    setSortDirectionName(newDirection);
    setData(sortedData);
  };

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

  const toggleId = () => {
    const newDirection =
      sortDirectionId === "descending" ? "ascending" : "descending";

    const parseIdentifier = (id) => {
      const match = id.match(/^([A-Za-z-]*)(\d+)$/);
      if (match) {
        return { prefix: match[1], number: parseInt(match[2], 10) };
      }
      return { prefix: "", number: parseInt(id, 10) };
    };

    const sortedData = [...data].sort((a, b) => {
      const idA = parseIdentifier(a?.identificador);
      const idB = parseIdentifier(b?.identificador);

      if (idA.prefix < idB.prefix) return newDirection === "ascending" ? -1 : 1;
      if (idA.prefix > idB.prefix) return newDirection === "ascending" ? 1 : -1;

      if (idA.number < idB.number) return newDirection === "ascending" ? -1 : 1;
      if (idA.number > idB.number) return newDirection === "ascending" ? 1 : -1;

      return 0;
    });

    setSortDirectionId(newDirection);
    setData(sortedData);
  };

  const searchInBar = (text) => {
    const query = normalize(text);
    const filteredData = originalData.filter(
      (row) =>
        row?.beneficiario.toUpperCase().includes(query.toUpperCase()) ||
        row?.identificador.toUpperCase().includes(query.toUpperCase())
    );
    setData(filteredData);
  };

  const [modalData, setModalData] = useState({
    title: "",
    date: "",
    beneficiary: "",
    Identifier: "",
    visible: false,
    data: [],
  });

  const handleGetDetails = async (id, title, date, beneficiary, Identifier) => {
    setModalData((state) => ({
      data: [],
      title: title,
      date: date,
      beneficiary: beneficiary,
      Identifier: Identifier,
      visible: true,
    }));
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
          <DataTable.Title
            sortDirection={sortDirectionName}
            onPress={toggleName}
          >
            Beneficiario
          </DataTable.Title>
          <DataTable.Title sortDirection={sortDirectionId} onPress={toggleId}>
            Identificador
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
              key={item.id_donaciones}
              onPress={() =>
                handleGetDetails(
                  item.id_donaciones,
                  item.id_donaciones,
                  item.fecha,
                  item.beneficiario,
                  item.identificador
                )
              }
            >
              <DataTable.Cell>{item.beneficiario}</DataTable.Cell>
              <DataTable.Cell>{item.identificador}</DataTable.Cell>
              <DataTable.Cell>{item.fecha}</DataTable.Cell>
            </DataTable.Row>
          ))
        ) : loading ? (
          <View className="p-2">
            <ActivityIndicator animating={true} />
          </View>
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
        onDismiss={() => {
          setModalData((state) => ({ ...state, visible: false }));
        }}
        title={"Numero de Donacion #" + modalData.title}
      >
        <View className="pr-4 text-md flex gap-y-2">
          <View className="flex flex-row justify-between">
            <Text className="font-bold">Identificador: </Text>
            <Text className="font-bold">{modalData?.Identifier} </Text>
          </View>
          <Divider />
          <View className="flex flex-row justify-between">
            <Text className="font-bold">Beneficiario: </Text>
            <Text className="font-bold">{modalData?.beneficiary} </Text>
          </View>
          <Divider />
          <View className="flex flex-row justify-between">
            <Text className="font-bold">Fecha: </Text>
            <Text className="font-bold">{modalData?.date} </Text>
          </View>
          <Divider />
          <Text>Productos: </Text>
          {modalData.data.length >= 1 ? (
            modalData.data.map((item, i) => (
              <View className="mx-2 gap-y-1">
                <View className="flex flex-row justify-between">
                  <Text className="font-extrabold">{item?.nombrepro}</Text>
                  <Text className="font-extrabold">{item?.cantidad}</Text>
                </View>
                {i != modalData.data.length - 1 && <Divider />}
              </View>
            ))
          ) : (
            <ActivityIndicator animating={true} />
          )}
        </View>
      </CustomModal>
    </View>
  );
};

export default function DonationSreen() {
  useCheckSession();
  return (
    <SafeAreaView className="flex-1 bg-theme-background">
      <ScrollView>
        <Table />
      </ScrollView>
    </SafeAreaView>
  );
}
