import { Box, Input, InputGroup } from "@chakra-ui/react"

export default function SearchBar({ value, onChange, placeholder = "Search the purse..." }) {
  return (
    <Box position="relative" w="100%">
      <Box
        position="absolute"
        left="14px"
        top="50%"
        transform="translateY(-50%)"
        color="#C9A84C"
        fontSize="1rem"
        pointerEvents="none"
        zIndex="1"
      >
        👜
      </Box>
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        pl="42px"
        pr="16px"
        h="48px"
        bg="#FFFDF9"
        border="1.5px solid #C9A84C"
        borderRadius="3px"
        fontSize="0.95rem"
        color="#2C1810"
        fontFamily='"Lato", system-ui, sans-serif'
        _placeholder={{ color: "#B5784A", opacity: 0.7 }}
        _focus={{
          outline: "none",
          borderColor: "#E8841A",
          boxShadow: "0 0 0 3px rgba(232,132,26,0.15)",
        }}
        _hover={{ borderColor: "#E8841A" }}
      />
    </Box>
  )
}
