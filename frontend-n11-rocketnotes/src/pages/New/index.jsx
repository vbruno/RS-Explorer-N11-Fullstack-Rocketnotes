import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Form } from "./styles";

import { api } from "../../services/api";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";

export function New() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  function handleAddLink() {
    setLinks((prevState) => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deletedLink) {
    setLinks((prevState) => prevState.filter((link) => link !== deletedLink));
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deletedTag) {
    setTags((prevState) => prevState.filter((tag) => tag !== deletedTag));
  }

  async function handleNewNote() {
    if (!title) {
      return alert("Você precisa preencher o título antes de salvar a nota");
    }

    if (newLink) {
      return alert("Você precisa adicionar o link antes de salvar a nota");
    }

    if (newTag) {
      return alert("Você precisa adicionar a tag antes de salvar a nota");
    }

    const note = {
      title,
      description,
      links,
      tags,
    };

    await api.post("/notes", note);

    alert("Nota criada com sucesso!");

    navigate(-1);
  }

  function handleBack() {
    navigate(-1);
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText title="Voltar" onClick={handleBack} />
          </header>

          <Input
            placeholder="Título"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Descrição"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {links.map((link, index) => (
              <NoteItem
                key={index}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
            ))}
            <NoteItem
              isNew
              placeholder="Novo Link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={index}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}
              <NoteItem
                isNew
                placeholder="Nova tag"
                onChange={(e) => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button title="Salvar" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  );
}
