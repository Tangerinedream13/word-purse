import { useState, useEffect, useCallback } from "react"
import { Box, Container, Flex, Text, Grid, Button, Spinner } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { listWords, searchWords } from "../api/words"
import WordCard from "../components/WordCard"
import SearchBar from "../components/SearchBar"
import PurseIllustration from "../components/PurseIllustration"

export default function HomePage() {
  const [words, setWords] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const limit = 12

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      if (query.trim()) {
        const data = await searchWords(query.trim())
        setWords(data.words || [])
        setTotal(data.words?.length || 0)
      } else {
        const data = await listWords({ page, limit })
        setWords(data.words || [])
        setTotal(data.total || 0)
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [query, page])

  useEffect(() => {
    const t = setTimeout(load, query ? 300 : 0)
    return () => clearTimeout(t)
  }, [load, query])

  useEffect(() => {
    setPage(1)
  }, [query])

  const totalPages = Math.ceil(total / limit)

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bg="linear-gradient(135deg, #FAF6EE 0%, #F5ECD7 60%, #EDD9B8 100%)"
        borderBottom="2px solid #C9A84C"
        py={{ base: 10, md: 16 }}
        px={4}
      >
        <Container maxW="1100px">
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="center"
            gap={{ base: 8, md: 16 }}
          >
            {/* Illustration */}
            <Box flexShrink={0}>
              <PurseIllustration size={260} />
            </Box>

            {/* Hero text */}
            <Box maxW="480px">
              <Text
                fontSize="0.8rem"
                fontWeight="700"
                letterSpacing="0.18em"
                textTransform="uppercase"
                color="#C9A84C"
                mb={2}
              >
                A Home for Invented Words
              </Text>
              <Text
                fontFamily='"Playfair Display", Georgia, serif'
                fontSize={{ base: "2.6rem", md: "3.4rem" }}
                fontWeight="700"
                color="#2C1810"
                lineHeight="1.15"
                mb={4}
              >
                Word Purse
              </Text>
              <Text
                fontSize="1.05rem"
                color="#4A2010"
                lineHeight="1.7"
                mb={6}
                maxW="420px"
              >
                Part dictionary, part idea archive, part community bookshelf.
                For the words that deserve to be carried, saved, and shown off.
              </Text>
              <Flex gap={3} wrap="wrap">
                <Link to="/add" style={{ textDecoration: "none" }}>
                  <Button
                    bg="#E8841A"
                    color="white"
                    fontWeight="700"
                    fontSize="0.9rem"
                    letterSpacing="0.05em"
                    textTransform="uppercase"
                    px={7}
                    py={3}
                    h="auto"
                    borderRadius="2px"
                    _hover={{ bg: "#CC6D0D", transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(232,132,26,0.4)" }}
                    transition="all 0.18s"
                  >
                    + Add a Word
                  </Button>
                </Link>
                <Button
                  as="a"
                  href="#words"
                  bg="transparent"
                  color="#2C1810"
                  fontWeight="700"
                  fontSize="0.9rem"
                  letterSpacing="0.05em"
                  textTransform="uppercase"
                  px={7}
                  py={3}
                  h="auto"
                  borderRadius="2px"
                  border="1.5px solid #C9A84C"
                  _hover={{ bg: "#C9A84C", color: "white", transform: "translateY(-2px)" }}
                  transition="all 0.18s"
                >
                  Browse Words
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Words Section */}
      <Container maxW="1100px" py={10} px={4} id="words">
        {/* Search + header */}
        <Flex align="center" justify="space-between" mb={6} wrap="wrap" gap={4}>
          <Text
            fontFamily='"Playfair Display", Georgia, serif'
            fontSize="1.5rem"
            fontWeight="700"
            color="#2C1810"
          >
            {query ? `Results for "${query}"` : "All Words"}
            {!loading && (
              <Text as="span" fontSize="0.9rem" fontWeight="400" color="#8B5E3C" ml={2}>
                ({total})
              </Text>
            )}
          </Text>
          <Box w={{ base: "100%", sm: "300px" }}>
            <SearchBar value={query} onChange={setQuery} />
          </Box>
        </Flex>

        {/* Word grid */}
        {loading ? (
          <Flex justify="center" py={16}>
            <Spinner size="lg" color="#E8841A" />
          </Flex>
        ) : error ? (
          <Box textAlign="center" py={16}>
            <Text fontSize="2rem" mb={3}>👜</Text>
            <Text color="#8B5E3C" fontStyle="italic">
              The purse seems to be closed right now. Make sure the API is running.
            </Text>
          </Box>
        ) : words.length === 0 ? (
          <Box
            textAlign="center"
            py={16}
            border="1.5px dashed #C9A84C"
            borderRadius="4px"
            bg="#FFFDF9"
          >
            <Text fontSize="2.5rem" mb={3}>👜</Text>
            <Text
              fontFamily='"Playfair Display", Georgia, serif'
              fontSize="1.3rem"
              color="#2C1810"
              mb={2}
            >
              {query ? "Nothing in the purse matches." : "The purse is empty."}
            </Text>
            <Text fontSize="0.95rem" color="#8B5E3C" mb={5}>
              {query ? "Try a different search." : "Be the first to add a word."}
            </Text>
            {!query && (
              <Link to="/add">
                <Button
                  bg="#E8841A"
                  color="white"
                  fontWeight="700"
                  borderRadius="2px"
                  _hover={{ bg: "#CC6D0D" }}
                >
                  + Add a Word
                </Button>
              </Link>
            )}
          </Box>
        ) : (
          <Grid
            templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            gap={5}
          >
            {words.map(w => (
              <WordCard key={w.id} word={w} onUpvote={load} />
            ))}
          </Grid>
        )}

        {/* Pagination */}
        {!query && totalPages > 1 && (
          <Flex justify="center" align="center" gap={3} mt={10}>
            <Button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              variant="ghost"
              color="#2C1810"
              fontWeight="600"
              fontSize="0.9rem"
              _hover={{ color: "#E8841A" }}
            >
              ← Previous
            </Button>
            <Text fontSize="0.9rem" color="#8B5E3C">
              Page {page} of {totalPages}
            </Text>
            <Button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              variant="ghost"
              color="#2C1810"
              fontWeight="600"
              fontSize="0.9rem"
              _hover={{ color: "#E8841A" }}
            >
              Next →
            </Button>
          </Flex>
        )}
      </Container>

      {/* Footer */}
      <Box borderTop="1px solid #EDD9B8" mt={8} py={6} textAlign="center">
        <Text fontSize="0.85rem" color="#8B5E3C">
          👜 Word Purse — because some invented words are too good to lose.
        </Text>
      </Box>
    </Box>
  )
}
