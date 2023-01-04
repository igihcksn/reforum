import { BASE_URL } from "constants";

const { Card, CardHeader, Heading, CardBody, CardFooter, Button, Text } = require("@chakra-ui/react");
const { useNavigate } = require("react-router-dom");

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Card align='center'>
            <CardHeader>
                <Heading size='md'> Upsss ... !</Heading>
            </CardHeader>
            <CardBody>
                <Text>Halaman yang anda akses tidak ditemukan, tapi tenang kamu dapat kembali ke homepage dengan menekan tombol dibawah</Text>
            </CardBody>
            <CardFooter>
                <Button colorScheme='blue' onClick={() => navigate(BASE_URL.HOMEPAGE)}>Kembali ke Homepage</Button>
            </CardFooter>
        </Card>
    )
};

export default NotFound;