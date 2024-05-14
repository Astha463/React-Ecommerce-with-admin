import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const borderColor = "#3778C2";
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff', // Change background color to white for letter format
    padding: 20, // Add padding for content spacing
  },
  section: {
    flexGrow: 1,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { 
    margin: 'auto', 
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderBottomWidth: 0,
    backgroundColor: '#f0f0f0', // Add background color for header row
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "#3778C2",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold"
  },
  description: {
    width: "60%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8
  },
  qty: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8
  },
  rate: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8
  },
  amount: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8
  }
});

// Create Document Component
const MyPdf = ({ purchasedProducts, userData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* User info */}
      <View style={styles.section}>
        <Text>Dear {userData.userFound.fullname}</Text>
      
      </View>
      {/* Product table */}
      <View style={styles.section}>
        <View style={styles.table}>
          {/* Table headers */}
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Description</Text>
            <Text style={styles.tableColHeader}>Quantity</Text>
            <Text style={styles.tableColHeader}>Rate</Text>
            <Text style={styles.tableColHeader}>Amount</Text>
          </View>
          {/* Table body */}
          {purchasedProducts.map((item) => (
            <View style={styles.tableRow} key={item.id}>
              <Text style={styles.tableCol}>{item.description}</Text>
              <Text style={styles.tableCol}>{item.qty}</Text>
              <Text style={styles.tableCol}>{item.rate}</Text>
              <Text style={styles.tableCol}>{(item.qty * item.rate).toFixed(2)}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default MyPdf;
