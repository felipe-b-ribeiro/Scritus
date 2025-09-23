--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-09-23 06:55:39

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 874 (class 1247 OID 20968)
-- Name: classificacao; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.classificacao AS ENUM (
    'Livre',
    '10',
    '12',
    '14',
    '16',
    '18'
);


ALTER TYPE public.classificacao OWNER TO postgres;

--
-- TOC entry 871 (class 1247 OID 20960)
-- Name: status_obra; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status_obra AS ENUM (
    'Rascunho',
    'Privado',
    'Público'
);


ALTER TYPE public.status_obra OWNER TO postgres;

--
-- TOC entry 880 (class 1247 OID 20990)
-- Name: tipo_interacao; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tipo_interacao AS ENUM (
    'curtida',
    'salvo',
    'clique',
    'comentario'
);


ALTER TYPE public.tipo_interacao OWNER TO postgres;

--
-- TOC entry 877 (class 1247 OID 20982)
-- Name: tipo_usuario; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tipo_usuario AS ENUM (
    'Autor',
    'Leitor',
    'Editora'
);


ALTER TYPE public.tipo_usuario OWNER TO postgres;

--
-- TOC entry 868 (class 1247 OID 20952)
-- Name: verificacao_cnpj; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.verificacao_cnpj AS ENUM (
    'Negado',
    'Verificado',
    'Pendente'
);


ALTER TYPE public.verificacao_cnpj OWNER TO postgres;

--
-- TOC entry 239 (class 1255 OID 21213)
-- Name: set_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.atualizado_em = CURRENT_TIMESTAMP;
  RETURN NEW;
END; $$;


ALTER FUNCTION public.set_updated_at() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 236 (class 1259 OID 21115)
-- Name: interacoes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.interacoes (
    id_interacao integer NOT NULL,
    id_perfil integer NOT NULL,
    id_obra integer NOT NULL,
    tipo public.tipo_interacao NOT NULL,
    conteudo text,
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.interacoes OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 21114)
-- Name: interacoes_id_interacao_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.interacoes_id_interacao_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.interacoes_id_interacao_seq OWNER TO postgres;

--
-- TOC entry 4986 (class 0 OID 0)
-- Dependencies: 235
-- Name: interacoes_id_interacao_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.interacoes_id_interacao_seq OWNED BY public.interacoes.id_interacao;


--
-- TOC entry 229 (class 1259 OID 21077)
-- Name: mensagens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mensagens (
    id_mensagem integer NOT NULL,
    id_remetente integer NOT NULL,
    id_destinatario integer NOT NULL,
    conteudo text NOT NULL,
    enviado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    lido boolean DEFAULT false NOT NULL
);


ALTER TABLE public.mensagens OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 21076)
-- Name: mensagens_id_mensagem_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mensagens_id_mensagem_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mensagens_id_mensagem_seq OWNER TO postgres;

--
-- TOC entry 4987 (class 0 OID 0)
-- Dependencies: 228
-- Name: mensagens_id_mensagem_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mensagens_id_mensagem_seq OWNED BY public.mensagens.id_mensagem;


--
-- TOC entry 234 (class 1259 OID 21109)
-- Name: obra_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.obra_tags (
    id_obra integer NOT NULL,
    id_tag integer NOT NULL
);


ALTER TABLE public.obra_tags OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 21088)
-- Name: obras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.obras (
    id_obra integer NOT NULL,
    id_autor integer NOT NULL,
    titulo character varying(200) NOT NULL,
    sinopse character varying(500) NOT NULL,
    trecho_de_amostra character varying(500),
    capa_url text DEFAULT 'uploads/img/capas/capa_padrao.png'::text,
    pdf_url text NOT NULL,
    status_obra public.status_obra DEFAULT 'Rascunho'::public.status_obra NOT NULL,
    classificacao_indicativa public.classificacao NOT NULL,
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    atualizado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.obras OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 21087)
-- Name: obras_id_obra_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.obras_id_obra_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.obras_id_obra_seq OWNER TO postgres;

--
-- TOC entry 4988 (class 0 OID 0)
-- Dependencies: 230
-- Name: obras_id_obra_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.obras_id_obra_seq OWNED BY public.obras.id_obra;


--
-- TOC entry 222 (class 1259 OID 21025)
-- Name: perfil_autor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perfil_autor (
    id_autor integer NOT NULL,
    id_perfil integer NOT NULL,
    pseudonimo character varying(150) NOT NULL,
    nome_autor character varying(200) NOT NULL,
    data_nascimento date NOT NULL,
    foto_perfil_url text DEFAULT 'uploads/img/fotos_perfil/foto_padrao_autor.png'::text,
    bio character varying(400),
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    atualizado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT data_nascimento_valida CHECK (((data_nascimento <= CURRENT_DATE) AND (data_nascimento > '1925-01-01'::date)))
);


ALTER TABLE public.perfil_autor OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 21024)
-- Name: perfil_autor_id_autor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.perfil_autor_id_autor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.perfil_autor_id_autor_seq OWNER TO postgres;

--
-- TOC entry 4989 (class 0 OID 0)
-- Dependencies: 221
-- Name: perfil_autor_id_autor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.perfil_autor_id_autor_seq OWNED BY public.perfil_autor.id_autor;


--
-- TOC entry 226 (class 1259 OID 21053)
-- Name: perfil_editora; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perfil_editora (
    id_editora integer NOT NULL,
    id_perfil integer NOT NULL,
    nome_fantasia character varying(200) NOT NULL,
    cnpj character(14) NOT NULL,
    cnpj_verificado public.verificacao_cnpj DEFAULT 'Pendente'::public.verificacao_cnpj NOT NULL,
    site_oficial character varying(150),
    foto_perfil_url text DEFAULT 'uploads/img/fotos_perfil/foto_padrao_editora.png'::text,
    bio character varying(400),
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    atualizado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.perfil_editora OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 21052)
-- Name: perfil_editora_id_editora_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.perfil_editora_id_editora_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.perfil_editora_id_editora_seq OWNER TO postgres;

--
-- TOC entry 4990 (class 0 OID 0)
-- Dependencies: 225
-- Name: perfil_editora_id_editora_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.perfil_editora_id_editora_seq OWNED BY public.perfil_editora.id_editora;


--
-- TOC entry 224 (class 1259 OID 21039)
-- Name: perfil_leitor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perfil_leitor (
    id_leitor integer NOT NULL,
    id_perfil integer NOT NULL,
    apelido character varying(200) NOT NULL,
    data_nascimento date NOT NULL,
    foto_perfil_url text DEFAULT 'uploads/img/fotos_perfil/foto_padrao_leitor.png'::text,
    bio character varying(400),
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    atualizado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.perfil_leitor OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 21038)
-- Name: perfil_leitor_id_leitor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.perfil_leitor_id_leitor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.perfil_leitor_id_leitor_seq OWNER TO postgres;

--
-- TOC entry 4991 (class 0 OID 0)
-- Dependencies: 223
-- Name: perfil_leitor_id_leitor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.perfil_leitor_id_leitor_seq OWNED BY public.perfil_leitor.id_leitor;


--
-- TOC entry 220 (class 1259 OID 21014)
-- Name: perfis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perfis (
    id_perfil integer NOT NULL,
    id_usuario integer NOT NULL,
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    atualizado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.perfis OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 21013)
-- Name: perfis_id_perfil_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.perfis_id_perfil_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.perfis_id_perfil_seq OWNER TO postgres;

--
-- TOC entry 4992 (class 0 OID 0)
-- Dependencies: 219
-- Name: perfis_id_perfil_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.perfis_id_perfil_seq OWNED BY public.perfis.id_perfil;


--
-- TOC entry 238 (class 1259 OID 21127)
-- Name: recomendacoes_feed; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recomendacoes_feed (
    id_recomendacao integer NOT NULL,
    id_perfil integer NOT NULL,
    id_obra integer NOT NULL,
    peso integer NOT NULL,
    algoritmo_versao character varying(50),
    parametros jsonb,
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.recomendacoes_feed OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 21126)
-- Name: recomendacoes_feed_id_recomendacao_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recomendacoes_feed_id_recomendacao_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recomendacoes_feed_id_recomendacao_seq OWNER TO postgres;

--
-- TOC entry 4993 (class 0 OID 0)
-- Dependencies: 237
-- Name: recomendacoes_feed_id_recomendacao_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recomendacoes_feed_id_recomendacao_seq OWNED BY public.recomendacoes_feed.id_recomendacao;


--
-- TOC entry 227 (class 1259 OID 21069)
-- Name: seguidores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.seguidores (
    id_seguidor integer NOT NULL,
    id_seguido integer NOT NULL,
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT seguidores_check CHECK ((id_seguidor <> id_seguido))
);


ALTER TABLE public.seguidores OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 21101)
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id_tag integer NOT NULL,
    nome_tag character varying(100) NOT NULL
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 21100)
-- Name: tags_id_tag_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tags_id_tag_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tags_id_tag_seq OWNER TO postgres;

--
-- TOC entry 4994 (class 0 OID 0)
-- Dependencies: 232
-- Name: tags_id_tag_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tags_id_tag_seq OWNED BY public.tags.id_tag;


--
-- TOC entry 218 (class 1259 OID 21000)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    email character varying(200) NOT NULL,
    senha_hash character varying(255) NOT NULL,
    tipo_usuario public.tipo_usuario NOT NULL,
    ativo boolean DEFAULT true NOT NULL,
    criado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    atualizado_em timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT email_valido CHECK (((email)::text ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'::text))
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 20999)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 4995 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- TOC entry 4740 (class 2604 OID 21118)
-- Name: interacoes id_interacao; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interacoes ALTER COLUMN id_interacao SET DEFAULT nextval('public.interacoes_id_interacao_seq'::regclass);


--
-- TOC entry 4731 (class 2604 OID 21080)
-- Name: mensagens id_mensagem; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensagens ALTER COLUMN id_mensagem SET DEFAULT nextval('public.mensagens_id_mensagem_seq'::regclass);


--
-- TOC entry 4734 (class 2604 OID 21091)
-- Name: obras id_obra; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.obras ALTER COLUMN id_obra SET DEFAULT nextval('public.obras_id_obra_seq'::regclass);


--
-- TOC entry 4717 (class 2604 OID 21028)
-- Name: perfil_autor id_autor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil_autor ALTER COLUMN id_autor SET DEFAULT nextval('public.perfil_autor_id_autor_seq'::regclass);


--
-- TOC entry 4725 (class 2604 OID 21056)
-- Name: perfil_editora id_editora; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil_editora ALTER COLUMN id_editora SET DEFAULT nextval('public.perfil_editora_id_editora_seq'::regclass);


--
-- TOC entry 4721 (class 2604 OID 21042)
-- Name: perfil_leitor id_leitor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil_leitor ALTER COLUMN id_leitor SET DEFAULT nextval('public.perfil_leitor_id_leitor_seq'::regclass);


--
-- TOC entry 4714 (class 2604 OID 21017)
-- Name: perfis id_perfil; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfis ALTER COLUMN id_perfil SET DEFAULT nextval('public.perfis_id_perfil_seq'::regclass);


--
-- TOC entry 4742 (class 2604 OID 21130)
-- Name: recomendacoes_feed id_recomendacao; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recomendacoes_feed ALTER COLUMN id_recomendacao SET DEFAULT nextval('public.recomendacoes_feed_id_recomendacao_seq'::regclass);


--
-- TOC entry 4739 (class 2604 OID 21104)
-- Name: tags id_tag; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags ALTER COLUMN id_tag SET DEFAULT nextval('public.tags_id_tag_seq'::regclass);


--
-- TOC entry 4710 (class 2604 OID 21003)
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 4978 (class 0 OID 21115)
-- Dependencies: 236
-- Data for Name: interacoes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.interacoes (id_interacao, id_perfil, id_obra, tipo, conteudo, criado_em) FROM stdin;
\.


--
-- TOC entry 4971 (class 0 OID 21077)
-- Dependencies: 229
-- Data for Name: mensagens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mensagens (id_mensagem, id_remetente, id_destinatario, conteudo, enviado_em, lido) FROM stdin;
\.


--
-- TOC entry 4976 (class 0 OID 21109)
-- Dependencies: 234
-- Data for Name: obra_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.obra_tags (id_obra, id_tag) FROM stdin;
\.


--
-- TOC entry 4973 (class 0 OID 21088)
-- Dependencies: 231
-- Data for Name: obras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.obras (id_obra, id_autor, titulo, sinopse, trecho_de_amostra, capa_url, pdf_url, status_obra, classificacao_indicativa, criado_em, atualizado_em) FROM stdin;
\.


--
-- TOC entry 4964 (class 0 OID 21025)
-- Dependencies: 222
-- Data for Name: perfil_autor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.perfil_autor (id_autor, id_perfil, pseudonimo, nome_autor, data_nascimento, foto_perfil_url, bio, criado_em, atualizado_em) FROM stdin;
1	6	Mordua	Felópios Juanésio de Souzadas	2025-09-02	uploads/img/fotos_perfil/foto_padrao_autor.png	\N	2025-09-21 18:51:45.898542	2025-09-21 18:51:45.898542
\.


--
-- TOC entry 4968 (class 0 OID 21053)
-- Dependencies: 226
-- Data for Name: perfil_editora; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.perfil_editora (id_editora, id_perfil, nome_fantasia, cnpj, cnpj_verificado, site_oficial, foto_perfil_url, bio, criado_em, atualizado_em) FROM stdin;
1	5	salepios bugiganga	08997497000176	Pendente	https://saleops.com	uploads/img/fotos_perfil/foto_padrao_editora.png	\N	2025-09-21 18:50:48.430116	2025-09-21 18:50:48.430116
\.


--
-- TOC entry 4966 (class 0 OID 21039)
-- Dependencies: 224
-- Data for Name: perfil_leitor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.perfil_leitor (id_leitor, id_perfil, apelido, data_nascimento, foto_perfil_url, bio, criado_em, atualizado_em) FROM stdin;
3	3	Jolebios	2025-08-31	uploads/img/fotos_perfil/foto_padrao_leitor.png	\N	2025-09-21 14:31:41.908911	2025-09-21 14:31:41.908911
4	7	Felosio	2025-09-02	uploads/img/fotos_perfil/foto_padrao_leitor.png	\N	2025-09-21 18:52:11.119298	2025-09-21 18:52:11.119298
\.


--
-- TOC entry 4962 (class 0 OID 21014)
-- Dependencies: 220
-- Data for Name: perfis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.perfis (id_perfil, id_usuario, criado_em, atualizado_em) FROM stdin;
3	5	2025-09-21 14:31:41.908911	2025-09-21 14:31:41.908911
5	7	2025-09-21 18:50:48.430116	2025-09-21 18:50:48.430116
6	8	2025-09-21 18:51:45.898542	2025-09-21 18:51:45.898542
7	9	2025-09-21 18:52:11.119298	2025-09-21 18:52:11.119298
\.


--
-- TOC entry 4980 (class 0 OID 21127)
-- Dependencies: 238
-- Data for Name: recomendacoes_feed; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recomendacoes_feed (id_recomendacao, id_perfil, id_obra, peso, algoritmo_versao, parametros, criado_em) FROM stdin;
\.


--
-- TOC entry 4969 (class 0 OID 21069)
-- Dependencies: 227
-- Data for Name: seguidores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.seguidores (id_seguidor, id_seguido, criado_em) FROM stdin;
\.


--
-- TOC entry 4975 (class 0 OID 21101)
-- Dependencies: 233
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tags (id_tag, nome_tag) FROM stdin;
\.


--
-- TOC entry 4960 (class 0 OID 21000)
-- Dependencies: 218
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, email, senha_hash, tipo_usuario, ativo, criado_em, atualizado_em) FROM stdin;
5	2@gmail.com	$argon2id$v=19$m=65536,t=3,p=4$IqcI8uw/7pB0clYn/9eYoA$Gev6FtF1f2B8M0XsncIOy0iMUNXnXctmznw99x/hc6Q	Leitor	t	2025-09-21 14:31:41.908911	2025-09-21 14:31:41.908911
7	admin@admin.com	$argon2id$v=19$m=65536,t=3,p=4$z3++rdu6p2V0BxODnvoKYg$E2jAmaZFncCeZBJb5QDTgqYNNfmePS1pSGlCREgAXBM	Editora	t	2025-09-21 18:50:48.430116	2025-09-21 18:50:48.430116
8	joks@gmail.com	$argon2id$v=19$m=65536,t=3,p=4$QLDlv24uXv1gJgfJUaJtdw$P5+sXeP5oGSOo277CVV5OLS/16vIraiQvXVjX5G/SRc	Autor	t	2025-09-21 18:51:45.898542	2025-09-21 18:51:45.898542
9	Folipos@gmail.com	$argon2id$v=19$m=65536,t=3,p=4$P6sIF51+YgsEYFqmASpEFw$IqD6jdTbibPTlPW0CysbPQTZkHG+D2wBv3iQY9rUsXI	Leitor	t	2025-09-21 18:52:11.119298	2025-09-21 18:52:11.119298
\.


--
-- TOC entry 4996 (class 0 OID 0)
-- Dependencies: 235
-- Name: interacoes_id_interacao_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.interacoes_id_interacao_seq', 1, false);


--
-- TOC entry 4997 (class 0 OID 0)
-- Dependencies: 228
-- Name: mensagens_id_mensagem_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mensagens_id_mensagem_seq', 1, false);


--
-- TOC entry 4998 (class 0 OID 0)
-- Dependencies: 230
-- Name: obras_id_obra_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.obras_id_obra_seq', 1, false);


--
-- TOC entry 4999 (class 0 OID 0)
-- Dependencies: 221
-- Name: perfil_autor_id_autor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.perfil_autor_id_autor_seq', 1, true);


--
-- TOC entry 5000 (class 0 OID 0)
-- Dependencies: 225
-- Name: perfil_editora_id_editora_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.perfil_editora_id_editora_seq', 1, true);


--
-- TOC entry 5001 (class 0 OID 0)
-- Dependencies: 223
-- Name: perfil_leitor_id_leitor_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.perfil_leitor_id_leitor_seq', 4, true);


--
-- TOC entry 5002 (class 0 OID 0)
-- Dependencies: 219
-- Name: perfis_id_perfil_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.perfis_id_perfil_seq', 7, true);


--
-- TOC entry 5003 (class 0 OID 0)
-- Dependencies: 237
-- Name: recomendacoes_feed_id_recomendacao_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recomendacoes_feed_id_recomendacao_seq', 1, false);


--
-- TOC entry 5004 (class 0 OID 0)
-- Dependencies: 232
-- Name: tags_id_tag_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tags_id_tag_seq', 1, false);


--
-- TOC entry 5005 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 9, true);


--
-- TOC entry 4788 (class 2606 OID 21125)
-- Name: interacoes interacoes_id_perfil_id_obra_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interacoes
    ADD CONSTRAINT interacoes_id_perfil_id_obra_key UNIQUE (id_perfil, id_obra);


--
-- TOC entry 4790 (class 2606 OID 21123)
-- Name: interacoes interacoes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interacoes
    ADD CONSTRAINT interacoes_pkey PRIMARY KEY (id_interacao);


--
-- TOC entry 4775 (class 2606 OID 21086)
-- Name: mensagens mensagens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensagens
    ADD CONSTRAINT mensagens_pkey PRIMARY KEY (id_mensagem);


--
-- TOC entry 4785 (class 2606 OID 21113)
-- Name: obra_tags obra_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.obra_tags
    ADD CONSTRAINT obra_tags_pkey PRIMARY KEY (id_obra, id_tag);


--
-- TOC entry 4779 (class 2606 OID 21099)
-- Name: obras obras_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.obras
    ADD CONSTRAINT obras_pkey PRIMARY KEY (id_obra);


--
-- TOC entry 4757 (class 2606 OID 21037)
-- Name: perfil_autor perfil_autor_id_perfil_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil_autor
    ADD CONSTRAINT perfil_autor_id_perfil_key UNIQUE (id_perfil);


--
-- TOC entry 4759 (class 2606 OID 21035)
-- Name: perfil_autor perfil_autor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil_autor
    ADD CONSTRAINT perfil_autor_pkey PRIMARY KEY (id_autor);


--
-- TOC entry 4765 (class 2606 OID 21068)
-- Name: perfil_editora perfil_editora_cnpj_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil_editora
    ADD CONSTRAINT perfil_editora_cnpj_key UNIQUE (cnpj);


--
-- TOC entry 4767 (class 2606 OID 21066)
-- Name: perfil_editora perfil_editora_id_perfil_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil_editora
    ADD CONSTRAINT perfil_editora_id_perfil_key UNIQUE (id_perfil);


--
-- TOC entry 4769 (class 2606 OID 21064)
-- Name: perfil_editora perfil_editora_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil_editora
    ADD CONSTRAINT perfil_editora_pkey PRIMARY KEY (id_editora);


--
-- TOC entry 4761 (class 2606 OID 21051)
-- Name: perfil_leitor perfil_leitor_id_perfil_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil_leitor
    ADD CONSTRAINT perfil_leitor_id_perfil_key UNIQUE (id_perfil);


--
-- TOC entry 4763 (class 2606 OID 21049)
-- Name: perfil_leitor perfil_leitor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil_leitor
    ADD CONSTRAINT perfil_leitor_pkey PRIMARY KEY (id_leitor);


--
-- TOC entry 4753 (class 2606 OID 21023)
-- Name: perfis perfis_id_usuario_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfis
    ADD CONSTRAINT perfis_id_usuario_key UNIQUE (id_usuario);


--
-- TOC entry 4755 (class 2606 OID 21021)
-- Name: perfis perfis_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfis
    ADD CONSTRAINT perfis_pkey PRIMARY KEY (id_perfil);


--
-- TOC entry 4792 (class 2606 OID 21135)
-- Name: recomendacoes_feed recomendacoes_feed_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recomendacoes_feed
    ADD CONSTRAINT recomendacoes_feed_pkey PRIMARY KEY (id_recomendacao);


--
-- TOC entry 4772 (class 2606 OID 21075)
-- Name: seguidores seguidores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguidores
    ADD CONSTRAINT seguidores_pkey PRIMARY KEY (id_seguidor, id_seguido);


--
-- TOC entry 4781 (class 2606 OID 21108)
-- Name: tags tags_nome_tag_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_nome_tag_key UNIQUE (nome_tag);


--
-- TOC entry 4783 (class 2606 OID 21106)
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id_tag);


--
-- TOC entry 4749 (class 2606 OID 21012)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4751 (class 2606 OID 21010)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4786 (class 1259 OID 21222)
-- Name: idx_interacoes_perfil_obra; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_interacoes_perfil_obra ON public.interacoes USING btree (id_perfil, id_obra);


--
-- TOC entry 4773 (class 1259 OID 21223)
-- Name: idx_mensagens_destinatario; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_mensagens_destinatario ON public.mensagens USING btree (id_destinatario) WHERE (lido = false);


--
-- TOC entry 4776 (class 1259 OID 21220)
-- Name: idx_obras_autor; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_obras_autor ON public.obras USING btree (id_autor);


--
-- TOC entry 4777 (class 1259 OID 21221)
-- Name: idx_obras_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_obras_status ON public.obras USING btree (status_obra) WHERE (status_obra = 'Público'::public.status_obra);


--
-- TOC entry 4770 (class 1259 OID 21225)
-- Name: idx_seguidores_seguido; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_seguidores_seguido ON public.seguidores USING btree (id_seguido);


--
-- TOC entry 4747 (class 1259 OID 21224)
-- Name: idx_usuarios_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_usuarios_email ON public.usuarios USING btree (email);


--
-- TOC entry 4810 (class 2620 OID 21215)
-- Name: perfil_autor trg_autor_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_autor_updated_at BEFORE UPDATE ON public.perfil_autor FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- TOC entry 4812 (class 2620 OID 21217)
-- Name: perfil_editora trg_editora_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_editora_updated_at BEFORE UPDATE ON public.perfil_editora FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- TOC entry 4811 (class 2620 OID 21216)
-- Name: perfil_leitor trg_leitor_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_leitor_updated_at BEFORE UPDATE ON public.perfil_leitor FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- TOC entry 4813 (class 2620 OID 21218)
-- Name: obras trg_obras_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_obras_updated_at BEFORE UPDATE ON public.obras FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- TOC entry 4809 (class 2620 OID 21214)
-- Name: perfis trg_perfis_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_perfis_updated_at BEFORE UPDATE ON public.perfis FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- TOC entry 4808 (class 2620 OID 21219)
-- Name: usuarios trg_usuarios_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_usuarios_updated_at BEFORE UPDATE ON public.usuarios FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- TOC entry 4804 (class 2606 OID 21196)
-- Name: interacoes fk_interacoes_obra; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interacoes
    ADD CONSTRAINT fk_interacoes_obra FOREIGN KEY (id_obra) REFERENCES public.obras(id_obra) ON DELETE CASCADE;


--
-- TOC entry 4805 (class 2606 OID 21191)
-- Name: interacoes fk_interacoes_perfil; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interacoes
    ADD CONSTRAINT fk_interacoes_perfil FOREIGN KEY (id_perfil) REFERENCES public.perfis(id_perfil) ON DELETE CASCADE;


--
-- TOC entry 4799 (class 2606 OID 21171)
-- Name: mensagens fk_mensagens_destinatario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensagens
    ADD CONSTRAINT fk_mensagens_destinatario FOREIGN KEY (id_destinatario) REFERENCES public.perfis(id_perfil) ON DELETE CASCADE;


--
-- TOC entry 4800 (class 2606 OID 21166)
-- Name: mensagens fk_mensagens_remetente; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensagens
    ADD CONSTRAINT fk_mensagens_remetente FOREIGN KEY (id_remetente) REFERENCES public.perfis(id_perfil) ON DELETE CASCADE;


--
-- TOC entry 4802 (class 2606 OID 21181)
-- Name: obra_tags fk_obra_tags_obra; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.obra_tags
    ADD CONSTRAINT fk_obra_tags_obra FOREIGN KEY (id_obra) REFERENCES public.obras(id_obra) ON DELETE CASCADE;


--
-- TOC entry 4803 (class 2606 OID 21186)
-- Name: obra_tags fk_obra_tags_tag; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.obra_tags
    ADD CONSTRAINT fk_obra_tags_tag FOREIGN KEY (id_tag) REFERENCES public.tags(id_tag) ON DELETE CASCADE;


--
-- TOC entry 4801 (class 2606 OID 21176)
-- Name: obras fk_obras_autor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.obras
    ADD CONSTRAINT fk_obras_autor FOREIGN KEY (id_autor) REFERENCES public.perfil_autor(id_autor) ON DELETE CASCADE;


--
-- TOC entry 4794 (class 2606 OID 21141)
-- Name: perfil_autor fk_perfil_autor_perfil; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil_autor
    ADD CONSTRAINT fk_perfil_autor_perfil FOREIGN KEY (id_perfil) REFERENCES public.perfis(id_perfil) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 4796 (class 2606 OID 21151)
-- Name: perfil_editora fk_perfil_editora_perfil; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil_editora
    ADD CONSTRAINT fk_perfil_editora_perfil FOREIGN KEY (id_perfil) REFERENCES public.perfis(id_perfil) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 4795 (class 2606 OID 21146)
-- Name: perfil_leitor fk_perfil_leitor_perfil; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfil_leitor
    ADD CONSTRAINT fk_perfil_leitor_perfil FOREIGN KEY (id_perfil) REFERENCES public.perfis(id_perfil) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;


--
-- TOC entry 4793 (class 2606 OID 21136)
-- Name: perfis fk_perfis_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfis
    ADD CONSTRAINT fk_perfis_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE;


--
-- TOC entry 4806 (class 2606 OID 21206)
-- Name: recomendacoes_feed fk_recomendacoes_obra; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recomendacoes_feed
    ADD CONSTRAINT fk_recomendacoes_obra FOREIGN KEY (id_obra) REFERENCES public.obras(id_obra) ON DELETE CASCADE;


--
-- TOC entry 4807 (class 2606 OID 21201)
-- Name: recomendacoes_feed fk_recomendacoes_perfil; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recomendacoes_feed
    ADD CONSTRAINT fk_recomendacoes_perfil FOREIGN KEY (id_perfil) REFERENCES public.perfis(id_perfil) ON DELETE CASCADE;


--
-- TOC entry 4797 (class 2606 OID 21161)
-- Name: seguidores fk_seguidores_seguido; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguidores
    ADD CONSTRAINT fk_seguidores_seguido FOREIGN KEY (id_seguido) REFERENCES public.perfil_autor(id_perfil) ON DELETE CASCADE;


--
-- TOC entry 4798 (class 2606 OID 21156)
-- Name: seguidores fk_seguidores_seguidor; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguidores
    ADD CONSTRAINT fk_seguidores_seguidor FOREIGN KEY (id_seguidor) REFERENCES public.perfis(id_perfil) ON DELETE CASCADE;


-- Completed on 2025-09-23 06:55:40

--
-- PostgreSQL database dump complete
--

