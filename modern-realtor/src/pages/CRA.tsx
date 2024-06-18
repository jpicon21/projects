// src/pages/CRA.tsx
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Input, Button, Stack, FormControl, FormLabel, Image, Flex } from '@chakra-ui/react';
import { PDFDocument, rgb } from 'pdf-lib';
import CRA_PDF from '../assets/CRA.pdf';
import CRA_Image from '../assets/home-cost.png';
import { sections } from '../data/craFieldValues.ts';
import Header from '../components/Header';

export const CRA = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    buyerName: '',
    propertyAddress: '',
    city: '',
    county: '',
    zipCode: '',
    parcelNumber: '',
    purchasePrice: '',
    escrowDate: '',
  });
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);

  const generatePdf = async (updatedFormData: typeof formData) => {
    const pdfBytes = await fetch(CRA_PDF).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const firstPage = pdfDoc.getPages()[0];

    firstPage.drawText(updatedFormData.buyerName, { x: 200, y: 672, size: 8, color: rgb(0, 0, 0) });
    firstPage.drawText(updatedFormData.propertyAddress, { x: 250, y: 662, size: 8, color: rgb(0, 0, 0) });
    firstPage.drawText(updatedFormData.city, { x: 70, y: 652, size: 8, color: rgb(0, 0, 0) });
    firstPage.drawText(updatedFormData.county, { x: 181, y: 652, size: 8, color: rgb(0, 0, 0) });
    firstPage.drawText(updatedFormData.zipCode, { x: 315, y: 652, size: 8, color: rgb(0, 0, 0) });
    firstPage.drawText(updatedFormData.parcelNumber, { x: 472, y: 652, size: 8, color: rgb(0, 0, 0) });
    firstPage.drawText(updatedFormData.purchasePrice, { x: 460, y: 632, size: 8, color: rgb(0, 0, 0) });
    firstPage.drawText(updatedFormData.escrowDate, { x: 150, y: 560, size: 8, color: rgb(0, 0, 0) });

    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    setPdfDataUri(pdfDataUri);
  };

  useEffect(() => {
    generatePdf(formData);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    const updatedFormData = { ...formData };
    await generatePdf(updatedFormData);

    if (currentStep < sections[currentSection].steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentSection(sections.length); // Proceed to overview
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentStep(sections[currentSection - 1].steps.length - 1);
    }
  };

  const handleDownloadPDF = async () => {
    const link = document.createElement('a');
    link.href = pdfDataUri!;
    link.download = 'CRA_Filled.pdf';
    link.click();
  };

  const getFieldLabel = (fieldName: string) => {
    for (const section of sections) {
      for (const step of section.steps) {
        for (const field of step.fields) {
          if (field.name === fieldName) {
            return field.label;
          }
        }
      }
    }
    return fieldName;
  };

  const isOverviewStep = currentSection === sections.length;

  const getButtonText = () => {
    if (currentStep < sections[currentSection].steps.length - 1) {
      return "Next";
    } else {
      return "Proceed to Overview";
    }
  };

  return (
    <>
      <Header title="CRA Form" />
      <Box justifyContent={"center"} bg="#F9F6EB" minH="100vh" px={4} py={8} overflow="hidden">
        <Flex justifyContent={"space-around"} direction={{ base: 'column', lg: 'row' }} gap={8}>
          <Box 
            p={6}
            boxShadow="xl" 
            borderRadius="lg" 
            bg="white" 
            maxW="600px" 
            width="100%"
            transform="scale(1.05)"
            transition="all 0.3s ease-in-out"
          >
            <Box display={"flex"} justifyContent={"center"}>
              <Image src={CRA_Image} alt="Static Image" w={"100px"} mb={8} />
            </Box>
            {isOverviewStep ? (
              <>
                <Heading as="h2" size="lg" mb={4}>Overview</Heading>
                <Text mb={4}>Review all your entries before downloading the PDF.</Text>
                {Object.entries(formData).map(([key, value]) => (
                  <Text key={key} mb={2}><strong>{getFieldLabel(key)}:</strong> {value}</Text>
                ))}
                <Button colorScheme="blue" onClick={handleDownloadPDF}>Download PDF</Button>
              </>
            ) : (
              <>
                <Heading as="h2" size="lg" mb={4}>Section: {sections[currentSection].title}</Heading>
                <Heading as="h3" size="md">{sections[currentSection].steps[currentStep].title}</Heading>
                <Text mb={8}>{sections[currentSection].steps[currentStep].description}</Text>
                {sections[currentSection].steps[currentStep].fields.map(field => (
                  <FormControl key={field.name} mb={4}>
                    <FormLabel color="teal.500">{field.label}</FormLabel>
                    <Input
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                    />
                  </FormControl>
                ))}
                <Stack direction="row" spacing={4} justify="center" mt={12}>
                  {currentStep > 0 || currentSection > 0 ? <Button onClick={handleBack}>Back</Button> : null}
                  <Button mt={6} colorScheme="blue" onClick={handleNext}>{getButtonText()}</Button>
                </Stack>
              </>
            )}
          </Box>
          <Box maxW="800px" width="100%">
            {pdfDataUri && (
              <iframe
                src={pdfDataUri}
                className="pdf-viewer"
                title="CRA PDF"
                style={{ width: '100%', height: '70vh', border: 'none' }}
              />
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
};
