import { Box, Text } from "@mantine/core";
import { useRef } from 'react';

const TestOffSet = () => {

    const refBox = useRef();

    console.log("offsettop", refBox?.current?.offsetTop)
    console.log(" window.pageYOffset ", document.body.scrollTop)

    setTimeout(() => {
        const relativo = document.getElementById("relativo");

        console.log("relativo ", relativo?.offsetTop)
    }, [2000])


    return (
        <Box style={{ height: "2000px", backgroundColor: '#0ee1a0', width: "100%", paddingTop: "450px" }}>
               <Box id="relativo" style={{ position: "relative", height: "200px", backgroundColor: '#ffb839', width: "100%", }}>
               <Box ref={refBox} style={{ height: "200px", backgroundColor: '#ffb839', width: "100%", }}>
                    {
                        <Text component="h2">
                            
                        </Text>
                    }
                </Box>
               </Box>
              
        </Box>
    )
}

export default TestOffSet;