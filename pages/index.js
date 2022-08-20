import Link from "next/link"
import Image from "next/image"
import {Flex, Box, Text, Button, ColorModeScript} from "@chakra-ui/react";
import theme from "./theme";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import Property from "../components/Property";

const Banner = ({ purpose, imageUrl, mainTitle, secondTitle, desc, secondDesc, url, btnText }) => (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
        <Image src={imageUrl} width={500} height={300} alt="banner" />
        <Box p="5">
            <Text color="gray.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
            <Text fontSize="3xl" fontWeight="bold">{mainTitle} <br/> {secondTitle}</Text>
            <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">{desc} <br/> {secondDesc}</Text>
            <Button fontSize="xl" bg="blue.300" color="white">
                <Link href={url}>{btnText}</Link>
            </Button>
        </Box>
    </Flex>
)

export default function Home({ propertiesForSale, propertiesForRent }) {
    return (
        <Box>
            <Banner
                purpose="RENT A HOME"
                mainTitle="Rental Homes for"
                secondTitle="Everyone"
                desc="Explore Apartments, Villas, Homes"
                secondDesc="and more"
                btnText="Explore Renting"
                url="/search?purpose=for-rent"
                imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
            />
            <Flex flexWrap="wrap" justifyContent="center">
                {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
            </Flex>
            <Banner
                purpose="BUY A HOME"
                mainTitle="Find, Buy & Own Your"
                secondTitle="Dream Home"
                desc="Explore Apartments, Villas, Homes"
                secondDesc="and more"
                btnText="Explore Buying"
                url="/search?purpose=for-sale"
                imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
            />
            <Flex flexWrap="wrap" justifyContent="center">
                {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
            </Flex>
        </Box>
    )
}

export async function getStaticProps() {
    const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
    const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

    return {
        props: {
            propertiesForRent: propertyForRent?.hits,
            propertiesForSale: propertyForSale?.hits
        }
    }
}
