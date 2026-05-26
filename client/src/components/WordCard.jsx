import { Box, Text, Flex, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { upvoteWord } from "../api/words"
import { useState } from "react"

export default function WordCard({ word, onUpvote }) {
  const [upvoting, setUpvoting] = useState(false)
  const [localUpvotes, setLocalUpvotes] = useState(word.upvotes)
  const [voted, setVoted] = useState(false)

  async function handleUpvote(e) {
    e.preventDefault()
    if (voted || upvoting) return
    setUpvoting(true)
    try {
      await upvoteWord(word.id)
      setLocalUpvotes(v => v + 1)
      setVoted(true)
      onUpvote?.()
    } catch (_) {
      // silent fail
    } finally {
      setUpvoting(false)
    }
  }

  return (
    <Link to={`/words/${word.id}`} style={{ textDecoration: "none" }}>
      <Box
        bg="#FFFDF9"
        border="1px solid #EDD9B8"
        borderLeft="4px solid #C9A84C"
        borderRadius="3px"
        p={5}
        h="100%"
        display="flex"
        flexDirection="column"
        gap={3}
        transition="all 0.18s"
        _hover={{
          transform: "translateY(-3px)",
          boxShadow: "0 8px 28px rgba(44,24,16,0.12)",
          borderLeftColor: "#E8841A",
        }}
        cursor="pointer"
      >
        {/* Term */}
        <Text
          fontFamily='"Playfair Display", Georgia, serif'
          fontSize="1.45rem"
          fontWeight="700"
          color="#2C1810"
          lineHeight="1.2"
        >
          {word.term}
        </Text>

        {/* Definition */}
        <Text
          fontSize="0.93rem"
          color="#4A2010"
          lineHeight="1.6"
          flex="1"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {word.definition}
        </Text>

        {/* Example sentence */}
        {word.example_sentence && (
          <Text
            fontSize="0.85rem"
            color="#8B5E3C"
            fontStyle="italic"
            lineHeight="1.5"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            &ldquo;{word.example_sentence}&rdquo;
          </Text>
        )}

        {/* Footer */}
        <Flex align="center" justify="space-between" mt="auto" pt={2} borderTop="1px solid #EDD9B8">
          <Text fontSize="0.78rem" color="#8B5E3C" fontWeight="500">
            by {word.submitted_by}
          </Text>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleUpvote}
            disabled={voted || upvoting}
            color={voted ? "#E8841A" : "#8B5E3C"}
            fontWeight="700"
            fontSize="0.82rem"
            px={2}
            py={1}
            minW="auto"
            h="auto"
            _hover={{ bg: "transparent", color: "#E8841A" }}
          >
            ✦ {localUpvotes}
          </Button>
        </Flex>
      </Box>
    </Link>
  )
}
