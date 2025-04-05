import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "33.33%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    backgroundColor: "#f2f2f2",
    padding: 5,
    fontWeight: "bold",
  },
  tableCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    padding: 5,
  },
});

// Componente do Documento PDF
const ProductListPDF = ({ products }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Lista de Produtos</Text>
      <View style={styles.table}>
        {/* Cabeçalho da Tabela */}
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>Nome do Produto</Text>
          <Text style={styles.tableColHeader}>Quantidade</Text>
          <Text style={styles.tableColHeader}>Data de Validade</Text>
        </View>
        {/* Linhas da Tabela */}
        {products.map((product, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCol}>{product.title}</Text>
            <Text style={styles.tableCol}>{product.quantity}</Text>
            <Text style={styles.tableCol}>
              {new Date(product.expirationDate).toLocaleDateString('pt-BR')}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ProductListPDF;
