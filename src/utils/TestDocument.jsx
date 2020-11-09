import React from "react";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Image,
  Text,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { paddingVertical: "1cm", paddingHorizontal: "1cm" },
});
const fontSrc =
  "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,600,600i|Lora:400,400i,700,700i";
Font.register({ family: "Source Sans Pro", src: fontSrc });

const TestDocument = ({ pages }) => {
  if (pages) {
    return (
      <Document>
        {pages.map((page) => (
          <Page key={page.id} size="LETTER" style={styles.page}>
            <Image src={page.img} />
          </Page>
        ))}
      </Document>
    );
  } else
    return (
      <Document>
        <Page size="LETTER">
          <View>
            <Text>This Pdf could not be generated</Text>
          </View>
        </Page>
      </Document>
    );
};

export default TestDocument;
