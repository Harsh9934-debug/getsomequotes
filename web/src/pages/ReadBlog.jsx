import {
  Center,
  Loader,
  Title,
  Text,
  Image,
  Badge,
  Stack,
  Code,
  Card,
  useMantineTheme,
  Avatar,
  Group,
  ScrollArea,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "../appwrite/getBlogById";
import { useParams } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { Quotes } from "@phosphor-icons/react";
import QuoteCard from "../components/QuoteCard";

const icon = <Quotes size={30} />;
// Custom components
const Title1 = ({ children }) => (
  <Title style={{ fontFamily: "Spectral, serif" }} fw={500} order={1} my={"md"}>
    {children}
  </Title>
);

const Title2 = ({ children }) => (
  <Title
    style={{ fontFamily: "Speactral, serif" }}
    fw={500}
    order={1}
    my={"md"}
  >
    {children}
  </Title>
);

const Title3 = ({ children }) => (
  <Title style={{ fontFamily: "Spectral, serif" }} order={3} my={"md"}>
    {children}
  </Title>
);

const CodeBlock = ({ children }) => {
  <Code block>{children}</Code>;
};

const TextMarkdown = ({ children }) => (
  <Text
    py={"xs"}
    ta={"left"}
    size="lg"
    style={{ fontFamily: "Spectral, serif" }}
  >
    {children}
  </Text>
);

const forEm = ({ children }) => (
  <Text style={{ fontFamily: "Cirular medium" }} fs={"italic"}>
    {children}
  </Text>
);

const ForBlockquote = ({ children }) => <QuoteCard quote={children} />;

const MarkdownToCustom = ({ markdown }) => {
  return (
    <Markdown
      options={{
        overrides: {
          code: { component: CodeBlock },
          h1: { component: Title1 },
          h2: { component: Title2 },
          h3: { component: Title3 },
          p: { component: TextMarkdown },
          em: { component: forEm },
          blockquote: { component: ForBlockquote },
        },
      }}
    >
      {markdown}
    </Markdown>
  );
};

function ReadBlog() {
  const theme = useMantineTheme();
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
  });

  const allImage = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
    "13.webp",
    "14.jpg",
    "15.jpg",
    "16.jpg",
    "17.webp",
    "18.webp",
    "19.webp",
    "20.webp",
    "21.webp",
    "22.webp",
    "23.webp",
    "24.jpg",
  ];

  const randomImage = allImage[Math.floor(Math.random() * allImage.length)];

  if (isLoading) {
    return (
      <Center h="100%">
        <Loader type="dots" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center h="100%">
        <Text>Error occurred while fetching the blog.</Text>
      </Center>
    );
  }

  return (
    <Stack miw={300} gap={0} align="start" maw={800} px={"md"} mx={"auto"}>
      <Image
        w={"100%"}
        miw={300}
        maw={600}
        src={`/images_4_blogs/${randomImage}`}
        radius={"md"}
        mih={300}
        mah={600}
      />
      <Badge color="gray" size="lg" style={{ fontFamily: "Afacad Flux" }}>
        {data.books.book_name}
      </Badge>

      <Text ta={"right"} size="md" style={{ fontFamily: "Afacad Flux" }}>
        —{data.books?.author || "Unknown"}
      </Text>

      <MarkdownToCustom markdown={data.blog_markdown} />
      <Text
        c={"gray"}
        style={{ fontFamily: "Afacad Flux", textTransform: "uppercase" }}
      >
        more from
      </Text>
      <Title
        fw={500}
        c={"dark"}
        order={4}
        style={{ fontFamily: "Afacad Flux", textTransform: "uppercase" }}
      >
        Unweaving the reandow
      </Title>
          <ScrollArea w={350} h={200}>

      <Group style={{ overflow: "hidden" }} mt={"xs"} wrap="nowrap">
        <Card
          miw={300}
          maw={300}
          p={"md"}
          radius={"lg"}
          bg={theme.colors.gray[2]}
        >
          <Title
            lineClamp={2}
            fw={500}
            order={4}
            c={"dark"}
            style={{ lineHeight: 1.2, fontFamily: "Afacad Flux" }}
          >
            I Dont Thing Richard Dawking Is Wrong Daeutch Is Right
          </Title>
          <Text
            c={"gray"}
            mt={5}
            size="sm"
            lineClamp={2}
            style={{ lineHeight: 1.1, fontFamily: "DM sans" }}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur
            est animi, illo reprehenderit vel consectetur dolor dolores aut
            veniam ratione similique aspernatur accusantium pariatur enim vero
            corporis officia, fugit adipisci!
          </Text>
          <Group
            style={{ overflowX: "scroll" }}
            gap={3}
            align="center"
            mt={"xs"}
          >
            <Avatar
              size={"xs"}
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
              alt="it's me"
            />
            <Text c={"dark"} size="xs">
              Bloomberg
            </Text>
          </Group>
        </Card>
        <Card
          miw={300}
          maw={300}
          p={"md"}
          radius={"lg"}
          bg={theme.colors.gray[2]}
        >
          <Title
            lineClamp={2}
            fw={500}
            order={4}
            c={"dark"}
            style={{ lineHeight: 1.2, fontFamily: "Afacad Flux" }}
          >
            I Dont Thing Richard Dawking Is Wrong Daeutch Is Right
          </Title>
          <Text
            c={"gray"}
            mt={5}
            size="sm"
            lineClamp={2}
            style={{ lineHeight: 1.1, fontFamily: "DM sans" }}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur
            est animi, illo reprehenderit vel consectetur dolor dolores aut
            veniam ratione similique aspernatur accusantium pariatur enim vero
            corporis officia, fugit adipisci!
          </Text>
          <Group
            style={{ overflowX: "scroll" }}
            gap={3}
            align="center"
            mt={"xs"}
          >
            <Avatar
              size={"xs"}
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
              alt="it's me"
            />
            <Text c={"dark"} size="xs">
              Bloomberg
            </Text>
          </Group>
        </Card>
      </Group>
          </ScrollArea>
    </Stack>
  );
}

export default ReadBlog;
