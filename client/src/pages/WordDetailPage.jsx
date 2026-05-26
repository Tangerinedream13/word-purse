import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Box, Container, Text, Flex, Button, Spinner } from "@chakra-ui/react"
import { getWord, upvoteWord } from "../api/words"

export default function WordDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [word, setWord] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [voted, setVoted] = useState(false)
  const [upvoting, setUpvoting] = useState(false)

  useEffect(() => {
    setLoading(true)
    getWord(id)
      .then(setWord)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  async function handleUpvote() {
    if (voted || upvoting) return
    setUpvoting(true)
    try {
      const updated = await upvoteWord(id)
      setWord(updated)
      setVoted(true)
    } catch (_) {}
    setUpvoting(false)
  }

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Spinner size="xl" color="#E8841A" />
      </Flex>
    )
  }

  if (error || !word) {
    return (
      <Container maxW="700px" py={16} textAlign="center">
        <Text fontSize="3rem" mb={4}>👜</Text>
        <Text fontFamily='"Playfair Display", Georgia, serif' fontSize="1.4rem" color="#2C1810" mb={3}>
          This word has gone missing from the purse.
        </Text>
        <Button onClick={() => navigate("/")} bg="#E8841A" color="white" borderRadius="2px" _hover={{ bg: "#CC6D0D" }}>
          Back to Browse
        </Button>
      </Container>
    )
  }

  const date = new Date(word.created_at).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  })

  return (
    <Box minH="100vh" bg="linear-gradient(180deg, #FAF6EE 0%, #F5ECD7 100%)">
      <Container maxW="700px" py={{ base: 8, md: 14 }} px={4}>

        {/* Breadcrumb */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <Text
            fontSize="0.82rem"
            color="#8B5E3C"
            fontWeight="600"
            letterSpacing="0.06em"
            textTransform="uppercase"
            mb={6}
            _hover={{ color: "#E8841A" }}
          >
            ← Back to the Purse
          </Text>
        </Link>

        {/* Word card */}
        <Box
          bg="#FFFDF9"
          border="1px solid #EDD9B8"
          borderTop="5px solid #C9A84C"
          borderRadius="4px"
          p={{ base: 6, md: 10 }}
          boxShadow="0 6px 32px rgba(44,24,16,0.09)"
        >
          {/* Term */}
          <Text
            fontFamily='"Playfair Display", Georgia, serif'
            fontSize={{ base: "2.4rem", md: "3rem" }}
            fontWeight="700"
            color="#2C1810"
            lineHeight="1.1"
            mb={2}
          >
            {word.term}
          </Text>

          {/* Submitted by / date */}
          <Flex align="center" gap={2} mb={6} wrap="wrap">
            <Text fontSize="0.82rem" color="#8B5E3C" fontWeight="500">
              coined by <strong>{word.submitted_by}</strong>
            </Text>
            <Text fontSize="0.82rem" color="#C9A84C">·</Text>
            <Text fontSize="0.82rem" color="#8B5E3C">{date}</Text>
          </Flex>

          {/* Gold divider */}
          <Box h="1px" bg="linear-gradient(90deg, #C9A84C, transparent)" mb={6} />

          {/* Definition */}
          <Box mb={6}>
            <Text
              fontSize="0.75rem"
              fontWeight="700"
              letterSpacing="0.14em"
              textTransform="uppercase"
              color="#C9A84C"
              mb={2}
            >
              Definition
            </Text>
            <Text fontSize="1.05rem" color="#2C1810" lineHeight="1.75">
              {word.definition}
            </Text>
          </Box>

          {/* Example sentence */}
          {word.example_sentence && (
            <Box mb={6} pl={5} borderLeft="3px solid #C9A84C">
              <Text
                fontSize="0.75rem"
                fontWeight="700"
                letterSpacing="0.14em"
                textTransform="uppercase"
                color="#C9A84C"
                mb={2}
              >
                In a Sentence
              </Text>
              <Text
                fontSize="1rem"
                color="#4A2010"
                fontStyle="italic"
                lineHeight="1.7"
              >
                &ldquo;{word.example_sentence}&rdquo;
              </Text>
            </Box>
          )}

          {/* Origin story */}
          {word.origin_story && (
            <Box mb={6}>
              <Text
                fontSize="0.75rem"
                fontWeight="700"
                letterSpacing="0.14em"
                textTransform="uppercase"
                color="#C9A84C"
                mb={2}
              >
                Origin Story
              </Text>
              <Text fontSize="0.95rem" color="#4A2010" lineHeight="1.7">
                {word.origin_story}
              </Text>
            </Box>
          )}

          {/* Gold divider */}
          <Box h="1px" bg="linear-gradient(90deg, #C9A84C, transparent)" mt={4} mb={6} />

          {/* Upvote */}
          <Flex align="center" justify="space-between">
            <Button
              onClick={handleUpvote}
              disabled={voted || upvoting}
              bg={voted ? "#FFF4E6" : "#FFFDF9"}
              border={`1.5px solid ${voted ? "#E8841A" : "#C9A84C"}`}
              color={voted ? "#E8841A" : "#6B3A1F"}
              fontWeight="700"
              fontSize="0.9rem"
              letterSpacing="0.04em"
              borderRadius="2px"
              px={5}
              h="40px"
              _hover={!voted ? { bg: "#FFF4E6", borderColor: "#E8841A", color: "#E8841A" } : {}}
              transition="all 0.15s"
            >
              ✦ {word.upvotes} {voted ? "— Saved!" : "Carry This Word"}
            </Button>

            <Link to="/add" style={{ textDecoration: "none" }}>
              <Button
                variant="ghost"
                color="#8B5E3C"
                fontWeight="600"
                fontSize="0.85rem"
                _hover={{ color: "#E8841A" }}
              >
                + Add Your Own
              </Button>
            </Link>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}
