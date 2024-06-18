// src/pages/PPT.tsx
import { useAtom } from 'jotai';
import { Box, Button, Heading, Input, SimpleGrid } from '@chakra-ui/react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LinearScale } from 'chart.js';
import { searchAddressAtom, homesDataAtom, Home } from '../atoms/atom';
import { loadCsvData } from '../utils/loadCsv';
import Header from '../components/Header';

ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale);

export const PPT = () => {
  const [searchAddress] = useAtom(searchAddressAtom);
  const [homesData, setHomesData] = useAtom<Home[]>(homesDataAtom);

  const radius = 30;
  const days = 30;

  const handleSearch = () => {
    const csvUrl = '/HomeHarvest.csv';
    loadCsvData(csvUrl, setHomesData);
  };

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  console.log(homesData);

  const timeVsPriceData = {
    datasets: [
      {
        label: 'Home Price',
        data: homesData
          .map(home => ({ x: parseDate(home.last_sold_date), y: home.sold_price }))
          .filter(point => point.x !== null),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
      },
    ],
  };

  const timeVsPricePerSqftData = {
    datasets: [
      {
        label: 'Price per SqFt',
        data: homesData
          .map(home => ({ x: parseDate(home.last_sold_date), y: home.price_per_sqft }))
          .filter(point => point.x !== null),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        pointBackgroundColor: 'rgba(153, 102, 255, 1)',
        pointBorderColor: '#fff',
      },
    ],
  };

  const homesSoldPerDayData = {
    datasets: [
      {
        label: 'Homes Sold',
        data: Object.entries(
          homesData.reduce((acc: Record<string, number>, home) => {
            const date = parseDate(home.last_sold_date);
            if (date) {
              const dateString = date.toISOString().split('T')[0];
              if (!acc[dateString]) {
                acc[dateString] = 0;
              }
              acc[dateString]++;
            }
            return acc;
          }, {} as Record<string, number>)
        ).map(([date, count]) => ({ x: new Date(date), y: count })),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
      },
    ],
  };

  return (
    <>
    <Header title="Property Price Trends (PPT)" />
    <Box mx="auto" p={5}>
      <Box maxW="70%" display="flex" justifyContent="center" margin="auto" mb={8}>
        <Input
          type="text"
          placeholder="Enter address"
          value={searchAddress}
          isReadOnly
          size="lg"
          variant="outline"
          mr={4}
        />
        <Input
          type="number"
          placeholder="Radius (miles)"
          value={radius}
          isReadOnly
          size="lg"
          variant="outline"
          mr={4}
        />
        <Input
          type="number"
          placeholder="Number of days"
          value={days}
          isReadOnly
          size="lg"
          variant="outline"
          mr={4}
        />
        <Button onClick={handleSearch} colorScheme="blue" size="lg">
          Search
        </Button>
      </Box>

      {homesData.length > 0 && (
        <SimpleGrid columns={1} spacing={8}>
          <Box>
            <Heading as="h3" size="lg" mb={4}>
              Time vs. Home Price
            </Heading>
            <Scatter data={timeVsPriceData} />
          </Box>
          <Box>
            <Heading as="h3" size="lg" mb={4}>
              Time vs. $/SqFt of Sold Homes
            </Heading>
            <Scatter data={timeVsPricePerSqftData} />
          </Box>
          <Box>
            <Heading as="h3" size="lg" mb={4}>
              Number of Homes Sold per Day
            </Heading>
            <Scatter data={homesSoldPerDayData} />
          </Box>
        </SimpleGrid>
      )}
    </Box>
    </>
  );
};
