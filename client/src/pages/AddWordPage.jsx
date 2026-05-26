import { useState } from "react"
import {
  Box, Container, Text, Flex, Button, Input, Textarea,
  Stack
} from "@chakra-ui/react"
import { useNavigate, Link } from "react-router-dom"
import { createWord } from "../api/words"
import PurseIllustration from "../components/PurseIllustration"

function Field({ label, hint, required, children }) {
  return (
    <Box>
      <Flex align="baseline" gap={1} mb={1}>
        <Text
          fontSize="0.82rem"
          fontWeight="700"
          letterSpacing="0.1em"
          textTransform="uppercase"
          color="#6B3A1F"
        >
          {label}
        </Text>
        {required && (
          <Text fontSize="0.75rem" color="#E8841A">*</Text>
        )}
      </Flex>
      {hint && (
        <Text fontSize="0.8rem" color="#8B5E3C" fontStyle="italic" mb={1.5}>
          {hint}
        </Text>
      )}
      {children}
    </Box>
  )
}

const inputStyle = {
  bg: "#FFFDF9",
  border: "1.5px solid #C9A84C",
  borderRadius: "3px",
  fontSize: "0.95rem",
  color: "#2C1810",
  _placeholder: { color: "#B5784A", opacity: 0.65 },
  _focus: { outline: "none", borderColor: "#E8841A", boxShadow: "0 0 0 3px rgba(232,132,26,0.15)" },
  _hover: { borderColor: "#E8841A" },
}

export default function AddWordPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    term: "",
    definition: "",
    example_sentence: "",
    origin_story: "",
    submitted_by: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  function update(key, value) {
    setForm(f => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const word = await createWord(form)
      navigate(`/words/${word.id}`)
    } catch (e) {
      setError(e.message)
      setSubmitting(false)
    }
  }

  return (
    <Box minH="100vh" bg="linear-gradient(135deg, #FAF6EE 0%, #F5ECD7 100%)">
      <Container maxW="700px" py={{ base: 8, md: 14 }} px={4}>

        {/* Header */}
        <Flex direction={{ base: "column", sm: "row" }} align="center" gap={4} mb={10}>
          <PurseIllustration size={90} />
          <Box>
            <Text
              fontSize="0.78rem"
              fontWeight="700"
              letterSpacing="0.16em"
              textTransform="uppercase"
              color="#C9A84C"
              mb={1}
            >
              Add to the Purse
            </Text>
            <Text
              fontFamily='"Playfair Display", Georgia, serif'
              fontSize={{ base: "2rem", md: "2.5rem" }}
              fontWeight="700"
              color="#2C1810"
              lineHeight="1.2"
            >
              Coin a New Word
            </Text>
            <Text fontSize="0.93rem" color="#6B3A1F" mt={1} lineHeight="1.6">
              Give your invented word a proper home. Fill in what you know.
            </Text>
          </Box>
        </Flex>

        {/* Form */}
        <Box
          as="form"
          onSubmit={handleSubmit}
          bg="#FFFDF9"
          border="1px solid #EDD9B8"
          borderTop="4px solid #C9A84C"
          borderRadius="4px"
          p={{ base: 6, md: 8 }}
          boxShadow="0 4px 24px rgba(44,24,16,0.07)"
        >
          <Stack gap={6}>
            <Field label="The Word" required hint="Your invented term — make it unforgettable.">
              <Input
                value={form.term}
                onChange={e => update("term", e.target.value)}
                placeholder="e.g. vellichor"
                required
                {...inputStyle}
                fontFamily='"Playfair Display", Georgia, serif'
                fontSize="1.1rem"
                fontWeight="600"
              />
            </Field>

            <Field label="Definition" required hint="What does it mean? Be specific, poetic, or both.">
              <Textarea
                value={form.definition}
                onChange={e => update("definition", e.target.value)}
                placeholder="The strange wistfulness of used bookshops..."
                required
                rows={4}
                resize="vertical"
                {...inputStyle}
              />
            </Field>

            <Field label="Use It in a Sentence" hint="Show the word living in the wild.">
              <Textarea
                value={form.example_sentence}
                onChange={e => update("example_sentence", e.target.value)}
                placeholder="She felt a deep vellichor standing in the dusty aisles of Powell's Books."
                rows={3}
                resize="vertical"
                {...inputStyle}
                fontStyle="italic"
              />
            </Field>

            <Field label="Origin Story" hint="How did this word come to you? (optional)">
              <Textarea
                value={form.origin_story}
                onChange={e => update("origin_story", e.target.value)}
                placeholder="Coined on a rainy afternoon in 2019 when no existing word would do..."
                rows={3}
                resize="vertical"
                {...inputStyle}
              />
            </Field>

            <Field label="Your Name" required hint="Who gets credit for this gem?">
              <Input
                value={form.submitted_by}
                onChange={e => update("submitted_by", e.target.value)}
                placeholder="e.g. Margaux"
                required
                {...inputStyle}
              />
            </Field>

            {error && (
              <Box
                bg="#FFF4E6"
                border="1.5px solid #E8841A"
                borderRadius="3px"
                p={3}
              >
                <Text fontSize="0.9rem" color="#B05600">{error}</Text>
              </Box>
            )}

            <Flex gap={3} justify="flex-end" pt={2}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button
                  variant="ghost"
                  color="#8B5E3C"
                  fontWeight="600"
                  fontSize="0.9rem"
                  _hover={{ color: "#2C1810" }}
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={submitting}
                bg="#E8841A"
                color="white"
                fontWeight="700"
                fontSize="0.9rem"
                letterSpacing="0.04em"
                textTransform="uppercase"
                px={8}
                borderRadius="2px"
                _hover={{ bg: "#CC6D0D", transform: "translateY(-1px)", boxShadow: "0 4px 16px rgba(232,132,26,0.4)" }}
                transition="all 0.18s"
              >
                {submitting ? "Adding..." : "Add to the Purse 👜"}
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
