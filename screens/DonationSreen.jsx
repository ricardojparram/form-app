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
        const res = await fetch(API_SRC + "?url=donativoPersonal&mostrar=&app=", {
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


    return (
        <View style={{ padding: 10 }}>
            <Searchbar
                className="mx-3"
                placeholder="Buscar..."
                onChangeText={(v) => searchInBar(v)}
            />
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>
                        Beneficiario
                    </DataTable.Title>
                    <DataTable.Title>
                        Cedula
                    </DataTable.Title>
                    <DataTable.Title>
                        Fecha
                    </DataTable.Title>
                </DataTable.Header>

                {data.length >= 1 ? (
                    data.slice(from , to).map((item) =>(
                    <DataTable.Row
                        key={item.id_donaciones}
                    >
                        <DataTable.Cell>{item.beneficiario}</DataTable.Cell>
                        <DataTable.Cell>{item.identificador}</DataTable.Cell>
                        <DataTable.Cell>{item.fecha}</DataTable.Cell>
                    </DataTable.Row>
                    ))
                ) : (
                    <Text className="m-auto py-5 drop-shadow-md">
                        No se encontró información...
                    </Text>
                )}
            </DataTable>
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