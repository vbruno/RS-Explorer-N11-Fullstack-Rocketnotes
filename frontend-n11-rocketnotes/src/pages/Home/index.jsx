import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { api } from "../../services/api";
import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { Note } from "../../components/Note";
import { ButtonText } from "../../components/ButtonText";

export function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [tags, seTags] = useState([]);
  const [tagsSelected, seTagsSelected] = useState([]);
  const [notes, setNotes] = useState([]);

  function handleTagSelected(tagName) {
    if (tagName === "all") {
      seTagsSelected([]);
      return;
    } else if (tagsSelected.includes(tagName)) {
      seTagsSelected(tagsSelected.filter((tag) => tag !== tagName));
    } else {
      seTagsSelected([...tagsSelected, tagName]);
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");

      seTags(response.data);
    }

    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(
        `/notes?title=${search}&tags=${tagsSelected}`
      );

      setNotes(response.data);
    }

    fetchNotes();
  }, [tagsSelected, search]);

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header></Header>

      <Menu>
        <li>
          <ButtonText
            title={"Todos"}
            isActive={tagsSelected.length === 0}
            onClick={() => handleTagSelected("all")}
          />
        </li>
        {tags &&
          tags.map((tag) => (
            <li key={tag.id}>
              <ButtonText
                title={tag.name}
                isActive={tagsSelected.includes(tag.name)}
                onClick={() => handleTagSelected(tag.name)}
              />
            </li>
          ))}
      </Menu>

      <Search>
        <Input
          placeholder={"Pesquisar pelo título"}
          icon={FiSearch}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title={"Minhas notas"}>
          {notes.map((note) => (
            <Note
              key={String(note.id)}
              data={note}
              onClick={() => handleDetails(note.id)}
            />
          ))}
        </Section>
      </Content>

      <NewNote to={"/new"}>
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  );
}
