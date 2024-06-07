import React from 'react'
import {
    Box,
    Button,
    Heading,
    FormControl,
    Input,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Text,
    InputGroup,
    InputRightElement,
    VStack
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useRegister } from '../../features/threads/hooks/useRegister'

export default function Register() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const {handleRegister, handleChange} = useRegister()

    const navigate = useNavigate()

    const handleToLogin = () => {
        navigate('/auth/login')
    }

  return (
    <Box width={"1280px"}  h={'100dvh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Card maxW='400px' borderWidth="1px" borderRadius="lg" p={5}>
            <CardHeader>
                <Heading textAlign={'center'} fontSize={40} fontWeight={'medium'} color={'green.300'}>circle</Heading>
                <Heading textAlign={'center'} mb={4} >Register to Circle</Heading>
            </CardHeader>
            <CardBody>
                <FormControl id="fullname" isRequired>
                <Input
                width='350px' 
                borderRadius={4}
                height={'30px'}
                name='full_name'
                placeholder="Your full name"
                color={'blackAlpha.700'}
                fontSize={12}
                onChange={handleChange}
                />
                </FormControl>

                <FormControl id="username" isRequired mt={4}>
                <Input
                width='350px' 
                borderRadius={4}
                height={'30px'}
                name='username'
                placeholder="Your username"
                color={'blackAlpha.700'}
                fontSize={12}
                onChange={handleChange}
                />
                </FormControl>

                <FormControl id="email" isRequired mt={4}>
                <Input
                width='350px' 
                borderRadius={4}
                height={'30px'}
                type="email"
                name='email'
                placeholder="Your email"
                color={'blackAlpha.700'}
                fontSize={12}
                onChange={handleChange}
                />
                </FormControl>

                <FormControl id="password" isRequired mt={4}>
                    <InputGroup>
                        <Input
                        height={'30px'}
                        borderRadius={4}
                        type={show ? 'text' : 'password'}
                        placeholder="Your password"
                        name='password'
                        width='280px' 
                        color={'blackAlpha.700'}
                        fontSize={12}
                        onCanPlay={handleChange}
                        />
                        <InputRightElement >
                            <Button h='1.75rem' size='sm' bg={'gray.600'} p={2} borderRadius={4} onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    
                </FormControl>
            </CardBody>
            <CardFooter>
                <VStack m={'0 auto'}>
                    <Button colorScheme="blue" width="350px" mt={4} bg={'#2e7841'} borderRadius={4} onClick={handleRegister} >
                        Register
                    </Button>
                    <Button onClick={handleToLogin}>
                       <Box display={'flex'}>
                            <Text fontWeight={'light'} fontSize={12}>Already have account?</Text>
                            <Text fontSize={12} fontWeight={'medium'} color={'#2e7841'}>Login</Text>
                        </Box> 
                    </Button>
                    
                </VStack>
            </CardFooter>
        </Card>
    </Box>
  )
}
