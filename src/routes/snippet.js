const { Router } = require('express')
const router = Router()
const { encrypt, decrypt } = require('../utils/encrypt')

const snippets = require('../seedData.json')

let id = snippets.length

router.get("/", (req, res) => {
    const { language } = req.query

    const decryptedSnippets = snippets.map(snippet => ({
        ...snippet,
        code: decrypt(snippet.code)
    }))

    if (language) {
        const filteredLanguages = snippets.filter(
            snippet => snippet.language.toLowerCase() === language.toLowerCase()
        )
        return res.json(filteredLanguages)
    }
    res.send(snippets)
})

router.get("/:id", (req, res) => {
    const snippetId = parseInt(req.params.id)
    const snippet = snippets.find(snippet => snippet.id === snippetId)

    if (!snippet) {
        return res.status(404).json({ error: 'Snippet not found' })
    }

    snippet.code = decrypt(snippet.code)
    res.json(snippet)
})

router.post("/", (req, res) => {
    const { language, code } = req.body

    if (!language || !code) {
        return res
            .status(400)
            .json({ error: "Language and Code are required fields"})
    }

    const snippet = {
        id: ++id,
        language,
        code
    }

    snippets.push({...snippet, code: encrypt(code)});
    res.status(201).json(snippet)
})

module.exports = { router };