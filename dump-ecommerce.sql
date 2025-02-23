PGDMP     ,                    |         	   ecommerce    15.7    15.6 �    X           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Y           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            Z           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            [           1262    16511 	   ecommerce    DATABASE     t   CREATE DATABASE ecommerce WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF8';
    DROP DATABASE ecommerce;
                cloudsqlsuperuser    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            \           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    5            ]           0    0    SCHEMA public    ACL     1   GRANT ALL ON SCHEMA public TO cloudsqlsuperuser;
                   pg_database_owner    false    5            �            1259    17357    carrito_compras    TABLE     �   CREATE TABLE public.carrito_compras (
    id_carrito integer NOT NULL,
    id_usuario integer NOT NULL,
    estado character varying(4) NOT NULL
);
 #   DROP TABLE public.carrito_compras;
       public         heap    postgres    false    5            �            1259    17356    carrito_compras_id_carrito_seq    SEQUENCE     �   CREATE SEQUENCE public.carrito_compras_id_carrito_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.carrito_compras_id_carrito_seq;
       public          postgres    false    251    5            ^           0    0    carrito_compras_id_carrito_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.carrito_compras_id_carrito_seq OWNED BY public.carrito_compras.id_carrito;
          public          postgres    false    250            �            1259    16585 
   categorias    TABLE     {   CREATE TABLE public.categorias (
    id_categoria integer NOT NULL,
    nombre_categoria character varying(20) NOT NULL
);
    DROP TABLE public.categorias;
       public         heap    postgres    false    5            �            1259    16584    categorias_id_categoria_seq    SEQUENCE     �   CREATE SEQUENCE public.categorias_id_categoria_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.categorias_id_categoria_seq;
       public          postgres    false    5    225            _           0    0    categorias_id_categoria_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.categorias_id_categoria_seq OWNED BY public.categorias.id_categoria;
          public          postgres    false    224            �            1259    17220    detalle_factura    TABLE     �   CREATE TABLE public.detalle_factura (
    id_detalle_factura integer NOT NULL,
    id_producto integer,
    total_detalle numeric NOT NULL,
    porcentaje_descuento numeric NOT NULL,
    cantidad integer NOT NULL,
    id_factura integer
);
 #   DROP TABLE public.detalle_factura;
       public         heap    postgres    false    5            �            1259    17282    detalle_nota_de_credito    TABLE     �   CREATE TABLE public.detalle_nota_de_credito (
    id_detalle_nota_credito integer NOT NULL,
    id_nota_credito integer NOT NULL,
    id_producto integer NOT NULL,
    cantidad integer NOT NULL,
    total_detalle numeric(10,2) NOT NULL
);
 +   DROP TABLE public.detalle_nota_de_credito;
       public         heap    postgres    false    5            �            1259    17281 3   detalle_nota_de_credito_id_detalle_nota_credito_seq    SEQUENCE     �   CREATE SEQUENCE public.detalle_nota_de_credito_id_detalle_nota_credito_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 J   DROP SEQUENCE public.detalle_nota_de_credito_id_detalle_nota_credito_seq;
       public          postgres    false    5    249            `           0    0 3   detalle_nota_de_credito_id_detalle_nota_credito_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.detalle_nota_de_credito_id_detalle_nota_credito_seq OWNED BY public.detalle_nota_de_credito.id_detalle_nota_credito;
          public          postgres    false    248            �            1259    17219 %   detallefactura_id_detalle_factura_seq    SEQUENCE     �   CREATE SEQUENCE public.detallefactura_id_detalle_factura_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.detallefactura_id_detalle_factura_seq;
       public          postgres    false    5    243            a           0    0 %   detallefactura_id_detalle_factura_seq    SEQUENCE OWNED BY     p   ALTER SEQUENCE public.detallefactura_id_detalle_factura_seq OWNED BY public.detalle_factura.id_detalle_factura;
          public          postgres    false    242            �            1259    17192    facturas    TABLE     f  CREATE TABLE public.facturas (
    id_factura integer NOT NULL,
    fecha date NOT NULL,
    hora_factura time without time zone NOT NULL,
    id_user integer,
    total_factura numeric NOT NULL,
    porcentaje_descuento numeric NOT NULL,
    id_metodopago integer,
    impuesto numeric(10,4),
    estado character varying(10),
    subtotal numeric(10,4)
);
    DROP TABLE public.facturas;
       public         heap    postgres    false    5            �            1259    17191    factura_id_factura_seq    SEQUENCE     �   CREATE SEQUENCE public.factura_id_factura_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.factura_id_factura_seq;
       public          postgres    false    5    241            b           0    0    factura_id_factura_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public.factura_id_factura_seq OWNED BY public.facturas.id_factura;
          public          postgres    false    240            �            1259    16592    marcas    TABLE     o   CREATE TABLE public.marcas (
    id_marca integer NOT NULL,
    nombre_marca character varying(20) NOT NULL
);
    DROP TABLE public.marcas;
       public         heap    postgres    false    5            �            1259    16591    marcas_id_marca_seq    SEQUENCE     �   CREATE SEQUENCE public.marcas_id_marca_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.marcas_id_marca_seq;
       public          postgres    false    5    227            c           0    0    marcas_id_marca_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.marcas_id_marca_seq OWNED BY public.marcas.id_marca;
          public          postgres    false    226            �            1259    16956    menus    TABLE     g   CREATE TABLE public.menus (
    id_menu bigint NOT NULL,
    nombre character varying(100) NOT NULL
);
    DROP TABLE public.menus;
       public         heap    postgres    false    5            �            1259    16955    menus_id_menu_seq    SEQUENCE     �   ALTER TABLE public.menus ALTER COLUMN id_menu ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.menus_id_menu_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    231    5            �            1259    17165    metodos_pago    TABLE     �   CREATE TABLE public.metodos_pago (
    id_metodo_pago integer NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion text,
    estado character varying(4)
);
     DROP TABLE public.metodos_pago;
       public         heap    postgres    false    5            �            1259    17164    metodospago_id_metodopago_seq    SEQUENCE     �   CREATE SEQUENCE public.metodospago_id_metodopago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.metodospago_id_metodopago_seq;
       public          postgres    false    5    239            d           0    0    metodospago_id_metodopago_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.metodospago_id_metodopago_seq OWNED BY public.metodos_pago.id_metodo_pago;
          public          postgres    false    238            �            1259    17263    nota_de_credito    TABLE       CREATE TABLE public.nota_de_credito (
    id_nota_credito integer NOT NULL,
    fecha date NOT NULL,
    monto numeric(10,2) NOT NULL,
    descripcion text,
    id_factura integer NOT NULL,
    id_usuario integer NOT NULL,
    estado character varying(4) NOT NULL
);
 #   DROP TABLE public.nota_de_credito;
       public         heap    postgres    false    5            �            1259    17262 #   nota_de_credito_id_nota_credito_seq    SEQUENCE     �   CREATE SEQUENCE public.nota_de_credito_id_nota_credito_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.nota_de_credito_id_nota_credito_seq;
       public          postgres    false    247    5            e           0    0 #   nota_de_credito_id_nota_credito_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.nota_de_credito_id_nota_credito_seq OWNED BY public.nota_de_credito.id_nota_credito;
          public          postgres    false    246            �            1259    17016    permisos    TABLE     l   CREATE TABLE public.permisos (
    id_permiso bigint NOT NULL,
    nombre character varying(50) NOT NULL
);
    DROP TABLE public.permisos;
       public         heap    postgres    false    5            �            1259    17015    permisos_id_permisos_seq    SEQUENCE     �   ALTER TABLE public.permisos ALTER COLUMN id_permiso ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.permisos_id_permisos_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    235    5            �            1259    16543    persons    TABLE     �  CREATE TABLE public.persons (
    id_persona integer NOT NULL,
    nombre character varying(30) NOT NULL,
    apellido character varying(30) NOT NULL,
    direccion character varying(60) NOT NULL,
    celular character varying(10) NOT NULL,
    telefono character varying(8) NOT NULL,
    correo character varying(50) NOT NULL,
    fecha_nacimiento date NOT NULL,
    identificacion character varying(10) NOT NULL,
    id_tipo_identificacion integer
);
    DROP TABLE public.persons;
       public         heap    postgres    false    5            �            1259    16542    persons_id_persona_seq    SEQUENCE     �   CREATE SEQUENCE public.persons_id_persona_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.persons_id_persona_seq;
       public          postgres    false    5    217            f           0    0    persons_id_persona_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.persons_id_persona_seq OWNED BY public.persons.id_persona;
          public          postgres    false    216            �            1259    16599 	   productos    TABLE     S  CREATE TABLE public.productos (
    id_producto integer NOT NULL,
    nombre_producto character varying(50) NOT NULL,
    precio_unitario numeric(5,3) NOT NULL,
    stock integer NOT NULL,
    estado_producto character varying(4) NOT NULL,
    descripcion character varying(100) NOT NULL,
    id_marca integer,
    id_categoria integer
);
    DROP TABLE public.productos;
       public         heap    postgres    false    5            �            1259    17381    productos_carrito    TABLE     �   CREATE TABLE public.productos_carrito (
    id_producto_carrito integer NOT NULL,
    id_producto integer NOT NULL,
    id_carrito integer NOT NULL,
    cantidad integer NOT NULL
);
 %   DROP TABLE public.productos_carrito;
       public         heap    postgres    false    5            �            1259    17380 )   productos_carrito_id_producto_carrito_seq    SEQUENCE     �   CREATE SEQUENCE public.productos_carrito_id_producto_carrito_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 @   DROP SEQUENCE public.productos_carrito_id_producto_carrito_seq;
       public          postgres    false    253    5            g           0    0 )   productos_carrito_id_producto_carrito_seq    SEQUENCE OWNED BY     w   ALTER SEQUENCE public.productos_carrito_id_producto_carrito_seq OWNED BY public.productos_carrito.id_producto_carrito;
          public          postgres    false    252            �            1259    16598    productos_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.productos_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.productos_id_producto_seq;
       public          postgres    false    229    5            h           0    0    productos_id_producto_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.productos_id_producto_seq OWNED BY public.productos.id_producto;
          public          postgres    false    228                       1259    17478    productos_promociones    TABLE     �   CREATE TABLE public.productos_promociones (
    id_producto_promocion integer NOT NULL,
    id_producto integer,
    id_promocion integer
);
 )   DROP TABLE public.productos_promociones;
       public         heap    postgres    false    5                        1259    17477 /   productos_promociones_id_producto_promocion_seq    SEQUENCE     �   CREATE SEQUENCE public.productos_promociones_id_producto_promocion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 F   DROP SEQUENCE public.productos_promociones_id_producto_promocion_seq;
       public          postgres    false    257    5            i           0    0 /   productos_promociones_id_producto_promocion_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.productos_promociones_id_producto_promocion_seq OWNED BY public.productos_promociones.id_producto_promocion;
          public          postgres    false    256            �            1259    17471    promociones    TABLE     �   CREATE TABLE public.promociones (
    id_promocion integer NOT NULL,
    descripcion character varying(20),
    fecha_inicio date,
    fecha_fin date,
    estado character varying(4)
);
    DROP TABLE public.promociones;
       public         heap    postgres    false    5            �            1259    17470    promociones_id_promocion_seq    SEQUENCE     �   CREATE SEQUENCE public.promociones_id_promocion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.promociones_id_promocion_seq;
       public          postgres    false    255    5            j           0    0    promociones_id_promocion_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.promociones_id_promocion_seq OWNED BY public.promociones.id_promocion;
          public          postgres    false    254            �            1259    16558    roles    TABLE     �   CREATE TABLE public.roles (
    id_rol integer NOT NULL,
    nombre character varying(20) NOT NULL,
    estado character varying(4) NOT NULL
);
    DROP TABLE public.roles;
       public         heap    postgres    false    5            �            1259    16557    roles_id_rol_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.roles_id_rol_seq;
       public          postgres    false    5    219            k           0    0    roles_id_rol_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.roles_id_rol_seq OWNED BY public.roles.id_rol;
          public          postgres    false    218            �            1259    16962    roles_menus    TABLE     ~   CREATE TABLE public.roles_menus (
    id_rol_menu bigint NOT NULL,
    id_rol bigint NOT NULL,
    id_menu bigint NOT NULL
);
    DROP TABLE public.roles_menus;
       public         heap    postgres    false    5            �            1259    16961    roles_menus_id_rol_menu_seq    SEQUENCE     �   ALTER TABLE public.roles_menus ALTER COLUMN id_rol_menu ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.roles_menus_id_rol_menu_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    233    5            �            1259    17022    roles_menus_permisos    TABLE     �   CREATE TABLE public.roles_menus_permisos (
    id_rol_menu_permiso bigint NOT NULL,
    id_rol_menu bigint NOT NULL,
    id_permiso bigint NOT NULL,
    estado character varying(3) NOT NULL
);
 (   DROP TABLE public.roles_menus_permisos;
       public         heap    postgres    false    5            �            1259    17021 ,   roles_menus_permisos_id_rol_menu_permiso_seq    SEQUENCE       ALTER TABLE public.roles_menus_permisos ALTER COLUMN id_rol_menu_permiso ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.roles_menus_permisos_id_rol_menu_permiso_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    237    5            �            1259    16567    roles_usuario    TABLE     �   CREATE TABLE public.roles_usuario (
    id_rol_usuario integer NOT NULL,
    estado character varying(4) NOT NULL,
    id_usuario integer,
    id_rol integer
);
 !   DROP TABLE public.roles_usuario;
       public         heap    postgres    false    5            �            1259    16566     roles_usuario_id_rol_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_usuario_id_rol_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.roles_usuario_id_rol_usuario_seq;
       public          postgres    false    221    5            l           0    0     roles_usuario_id_rol_usuario_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.roles_usuario_id_rol_usuario_seq OWNED BY public.roles_usuario.id_rol_usuario;
          public          postgres    false    220            �            1259    16534    tipos_identificacion    TABLE     �   CREATE TABLE public.tipos_identificacion (
    id_tipo_identificacion integer NOT NULL,
    nombre character varying(20) NOT NULL,
    estado character varying(4) NOT NULL
);
 (   DROP TABLE public.tipos_identificacion;
       public         heap    postgres    false    5            �            1259    16533 /   tipos_identificacion_id_tipo_identificacion_seq    SEQUENCE     �   CREATE SEQUENCE public.tipos_identificacion_id_tipo_identificacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 F   DROP SEQUENCE public.tipos_identificacion_id_tipo_identificacion_seq;
       public          postgres    false    215    5            m           0    0 /   tipos_identificacion_id_tipo_identificacion_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.tipos_identificacion_id_tipo_identificacion_seq OWNED BY public.tipos_identificacion.id_tipo_identificacion;
          public          postgres    false    214            �            1259    17246    user_metodospago    TABLE     �   CREATE TABLE public.user_metodospago (
    id_user_metodo_pago integer NOT NULL,
    id_user integer,
    id_metodo_pago integer
);
 $   DROP TABLE public.user_metodospago;
       public         heap    postgres    false    5            �            1259    17245 (   user_metodospago_id_user_metodo_pago_seq    SEQUENCE     �   CREATE SEQUENCE public.user_metodospago_id_user_metodo_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public.user_metodospago_id_user_metodo_pago_seq;
       public          postgres    false    5    245            n           0    0 (   user_metodospago_id_user_metodo_pago_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.user_metodospago_id_user_metodo_pago_seq OWNED BY public.user_metodospago.id_user_metodo_pago;
          public          postgres    false    244            �            1259    16574    users    TABLE     t  CREATE TABLE public.users (
    id_usuario integer NOT NULL,
    username character varying(30) NOT NULL,
    fecha_creacion date NOT NULL,
    password character varying(100) NOT NULL,
    estado_usuario character varying(3) NOT NULL,
    estado_cuenta character varying(3) NOT NULL,
    fecha_ultima_conexion date NOT NULL,
    id_persona integer,
    id_rol numeric
);
    DROP TABLE public.users;
       public         heap    postgres    false    5            �            1259    16573    users_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.users_id_usuario_seq;
       public          postgres    false    5    223            o           0    0    users_id_usuario_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.users_id_usuario_seq OWNED BY public.users.id_usuario;
          public          postgres    false    222            C           2604    17360    carrito_compras id_carrito    DEFAULT     �   ALTER TABLE ONLY public.carrito_compras ALTER COLUMN id_carrito SET DEFAULT nextval('public.carrito_compras_id_carrito_seq'::regclass);
 I   ALTER TABLE public.carrito_compras ALTER COLUMN id_carrito DROP DEFAULT;
       public          postgres    false    250    251    251            :           2604    16588    categorias id_categoria    DEFAULT     �   ALTER TABLE ONLY public.categorias ALTER COLUMN id_categoria SET DEFAULT nextval('public.categorias_id_categoria_seq'::regclass);
 F   ALTER TABLE public.categorias ALTER COLUMN id_categoria DROP DEFAULT;
       public          postgres    false    224    225    225            ?           2604    17223 "   detalle_factura id_detalle_factura    DEFAULT     �   ALTER TABLE ONLY public.detalle_factura ALTER COLUMN id_detalle_factura SET DEFAULT nextval('public.detallefactura_id_detalle_factura_seq'::regclass);
 Q   ALTER TABLE public.detalle_factura ALTER COLUMN id_detalle_factura DROP DEFAULT;
       public          postgres    false    242    243    243            B           2604    17285 /   detalle_nota_de_credito id_detalle_nota_credito    DEFAULT     �   ALTER TABLE ONLY public.detalle_nota_de_credito ALTER COLUMN id_detalle_nota_credito SET DEFAULT nextval('public.detalle_nota_de_credito_id_detalle_nota_credito_seq'::regclass);
 ^   ALTER TABLE public.detalle_nota_de_credito ALTER COLUMN id_detalle_nota_credito DROP DEFAULT;
       public          postgres    false    249    248    249            >           2604    17195    facturas id_factura    DEFAULT     y   ALTER TABLE ONLY public.facturas ALTER COLUMN id_factura SET DEFAULT nextval('public.factura_id_factura_seq'::regclass);
 B   ALTER TABLE public.facturas ALTER COLUMN id_factura DROP DEFAULT;
       public          postgres    false    241    240    241            ;           2604    16595    marcas id_marca    DEFAULT     r   ALTER TABLE ONLY public.marcas ALTER COLUMN id_marca SET DEFAULT nextval('public.marcas_id_marca_seq'::regclass);
 >   ALTER TABLE public.marcas ALTER COLUMN id_marca DROP DEFAULT;
       public          postgres    false    227    226    227            =           2604    17168    metodos_pago id_metodo_pago    DEFAULT     �   ALTER TABLE ONLY public.metodos_pago ALTER COLUMN id_metodo_pago SET DEFAULT nextval('public.metodospago_id_metodopago_seq'::regclass);
 J   ALTER TABLE public.metodos_pago ALTER COLUMN id_metodo_pago DROP DEFAULT;
       public          postgres    false    239    238    239            A           2604    17266    nota_de_credito id_nota_credito    DEFAULT     �   ALTER TABLE ONLY public.nota_de_credito ALTER COLUMN id_nota_credito SET DEFAULT nextval('public.nota_de_credito_id_nota_credito_seq'::regclass);
 N   ALTER TABLE public.nota_de_credito ALTER COLUMN id_nota_credito DROP DEFAULT;
       public          postgres    false    246    247    247            6           2604    16546    persons id_persona    DEFAULT     x   ALTER TABLE ONLY public.persons ALTER COLUMN id_persona SET DEFAULT nextval('public.persons_id_persona_seq'::regclass);
 A   ALTER TABLE public.persons ALTER COLUMN id_persona DROP DEFAULT;
       public          postgres    false    216    217    217            <           2604    16602    productos id_producto    DEFAULT     ~   ALTER TABLE ONLY public.productos ALTER COLUMN id_producto SET DEFAULT nextval('public.productos_id_producto_seq'::regclass);
 D   ALTER TABLE public.productos ALTER COLUMN id_producto DROP DEFAULT;
       public          postgres    false    228    229    229            D           2604    17384 %   productos_carrito id_producto_carrito    DEFAULT     �   ALTER TABLE ONLY public.productos_carrito ALTER COLUMN id_producto_carrito SET DEFAULT nextval('public.productos_carrito_id_producto_carrito_seq'::regclass);
 T   ALTER TABLE public.productos_carrito ALTER COLUMN id_producto_carrito DROP DEFAULT;
       public          postgres    false    253    252    253            F           2604    17481 +   productos_promociones id_producto_promocion    DEFAULT     �   ALTER TABLE ONLY public.productos_promociones ALTER COLUMN id_producto_promocion SET DEFAULT nextval('public.productos_promociones_id_producto_promocion_seq'::regclass);
 Z   ALTER TABLE public.productos_promociones ALTER COLUMN id_producto_promocion DROP DEFAULT;
       public          postgres    false    256    257    257            E           2604    17474    promociones id_promocion    DEFAULT     �   ALTER TABLE ONLY public.promociones ALTER COLUMN id_promocion SET DEFAULT nextval('public.promociones_id_promocion_seq'::regclass);
 G   ALTER TABLE public.promociones ALTER COLUMN id_promocion DROP DEFAULT;
       public          postgres    false    254    255    255            7           2604    16561    roles id_rol    DEFAULT     l   ALTER TABLE ONLY public.roles ALTER COLUMN id_rol SET DEFAULT nextval('public.roles_id_rol_seq'::regclass);
 ;   ALTER TABLE public.roles ALTER COLUMN id_rol DROP DEFAULT;
       public          postgres    false    219    218    219            8           2604    16570    roles_usuario id_rol_usuario    DEFAULT     �   ALTER TABLE ONLY public.roles_usuario ALTER COLUMN id_rol_usuario SET DEFAULT nextval('public.roles_usuario_id_rol_usuario_seq'::regclass);
 K   ALTER TABLE public.roles_usuario ALTER COLUMN id_rol_usuario DROP DEFAULT;
       public          postgres    false    221    220    221            5           2604    16537 +   tipos_identificacion id_tipo_identificacion    DEFAULT     �   ALTER TABLE ONLY public.tipos_identificacion ALTER COLUMN id_tipo_identificacion SET DEFAULT nextval('public.tipos_identificacion_id_tipo_identificacion_seq'::regclass);
 Z   ALTER TABLE public.tipos_identificacion ALTER COLUMN id_tipo_identificacion DROP DEFAULT;
       public          postgres    false    214    215    215            @           2604    17249 $   user_metodospago id_user_metodo_pago    DEFAULT     �   ALTER TABLE ONLY public.user_metodospago ALTER COLUMN id_user_metodo_pago SET DEFAULT nextval('public.user_metodospago_id_user_metodo_pago_seq'::regclass);
 S   ALTER TABLE public.user_metodospago ALTER COLUMN id_user_metodo_pago DROP DEFAULT;
       public          postgres    false    244    245    245            9           2604    16577    users id_usuario    DEFAULT     t   ALTER TABLE ONLY public.users ALTER COLUMN id_usuario SET DEFAULT nextval('public.users_id_usuario_seq'::regclass);
 ?   ALTER TABLE public.users ALTER COLUMN id_usuario DROP DEFAULT;
       public          postgres    false    223    222    223            O          0    17357    carrito_compras 
   TABLE DATA           I   COPY public.carrito_compras (id_carrito, id_usuario, estado) FROM stdin;
    public          postgres    false    251   ��       5          0    16585 
   categorias 
   TABLE DATA           D   COPY public.categorias (id_categoria, nombre_categoria) FROM stdin;
    public          postgres    false    225   �       G          0    17220    detalle_factura 
   TABLE DATA           �   COPY public.detalle_factura (id_detalle_factura, id_producto, total_detalle, porcentaje_descuento, cantidad, id_factura) FROM stdin;
    public          postgres    false    243   p�       M          0    17282    detalle_nota_de_credito 
   TABLE DATA           �   COPY public.detalle_nota_de_credito (id_detalle_nota_credito, id_nota_credito, id_producto, cantidad, total_detalle) FROM stdin;
    public          postgres    false    249   ��       E          0    17192    facturas 
   TABLE DATA           �   COPY public.facturas (id_factura, fecha, hora_factura, id_user, total_factura, porcentaje_descuento, id_metodopago, impuesto, estado, subtotal) FROM stdin;
    public          postgres    false    241   �       7          0    16592    marcas 
   TABLE DATA           8   COPY public.marcas (id_marca, nombre_marca) FROM stdin;
    public          postgres    false    227   u�       ;          0    16956    menus 
   TABLE DATA           0   COPY public.menus (id_menu, nombre) FROM stdin;
    public          postgres    false    231   ��       C          0    17165    metodos_pago 
   TABLE DATA           S   COPY public.metodos_pago (id_metodo_pago, nombre, descripcion, estado) FROM stdin;
    public          postgres    false    239   G�       K          0    17263    nota_de_credito 
   TABLE DATA           u   COPY public.nota_de_credito (id_nota_credito, fecha, monto, descripcion, id_factura, id_usuario, estado) FROM stdin;
    public          postgres    false    247   ��       ?          0    17016    permisos 
   TABLE DATA           6   COPY public.permisos (id_permiso, nombre) FROM stdin;
    public          postgres    false    235   �       -          0    16543    persons 
   TABLE DATA           �   COPY public.persons (id_persona, nombre, apellido, direccion, celular, telefono, correo, fecha_nacimiento, identificacion, id_tipo_identificacion) FROM stdin;
    public          postgres    false    217   Y�       9          0    16599 	   productos 
   TABLE DATA           �   COPY public.productos (id_producto, nombre_producto, precio_unitario, stock, estado_producto, descripcion, id_marca, id_categoria) FROM stdin;
    public          postgres    false    229   -�       Q          0    17381    productos_carrito 
   TABLE DATA           c   COPY public.productos_carrito (id_producto_carrito, id_producto, id_carrito, cantidad) FROM stdin;
    public          postgres    false    253   ��       U          0    17478    productos_promociones 
   TABLE DATA           a   COPY public.productos_promociones (id_producto_promocion, id_producto, id_promocion) FROM stdin;
    public          postgres    false    257   $�       S          0    17471    promociones 
   TABLE DATA           a   COPY public.promociones (id_promocion, descripcion, fecha_inicio, fecha_fin, estado) FROM stdin;
    public          postgres    false    255   P�       /          0    16558    roles 
   TABLE DATA           7   COPY public.roles (id_rol, nombre, estado) FROM stdin;
    public          postgres    false    219   ��       =          0    16962    roles_menus 
   TABLE DATA           C   COPY public.roles_menus (id_rol_menu, id_rol, id_menu) FROM stdin;
    public          postgres    false    233   ��       A          0    17022    roles_menus_permisos 
   TABLE DATA           d   COPY public.roles_menus_permisos (id_rol_menu_permiso, id_rol_menu, id_permiso, estado) FROM stdin;
    public          postgres    false    237   t�       1          0    16567    roles_usuario 
   TABLE DATA           S   COPY public.roles_usuario (id_rol_usuario, estado, id_usuario, id_rol) FROM stdin;
    public          postgres    false    221   ��       +          0    16534    tipos_identificacion 
   TABLE DATA           V   COPY public.tipos_identificacion (id_tipo_identificacion, nombre, estado) FROM stdin;
    public          postgres    false    215   �       I          0    17246    user_metodospago 
   TABLE DATA           X   COPY public.user_metodospago (id_user_metodo_pago, id_user, id_metodo_pago) FROM stdin;
    public          postgres    false    245   7�       3          0    16574    users 
   TABLE DATA           �   COPY public.users (id_usuario, username, fecha_creacion, password, estado_usuario, estado_cuenta, fecha_ultima_conexion, id_persona, id_rol) FROM stdin;
    public          postgres    false    223   T�       p           0    0    carrito_compras_id_carrito_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.carrito_compras_id_carrito_seq', 5, true);
          public          postgres    false    250            q           0    0    categorias_id_categoria_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.categorias_id_categoria_seq', 5, true);
          public          postgres    false    224            r           0    0 3   detalle_nota_de_credito_id_detalle_nota_credito_seq    SEQUENCE SET     b   SELECT pg_catalog.setval('public.detalle_nota_de_credito_id_detalle_nota_credito_seq', 10, true);
          public          postgres    false    248            s           0    0 %   detallefactura_id_detalle_factura_seq    SEQUENCE SET     T   SELECT pg_catalog.setval('public.detallefactura_id_detalle_factura_seq', 59, true);
          public          postgres    false    242            t           0    0    factura_id_factura_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.factura_id_factura_seq', 28, true);
          public          postgres    false    240            u           0    0    marcas_id_marca_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.marcas_id_marca_seq', 2, true);
          public          postgres    false    226            v           0    0    menus_id_menu_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.menus_id_menu_seq', 15, true);
          public          postgres    false    230            w           0    0    metodospago_id_metodopago_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.metodospago_id_metodopago_seq', 3, true);
          public          postgres    false    238            x           0    0 #   nota_de_credito_id_nota_credito_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.nota_de_credito_id_nota_credito_seq', 13, true);
          public          postgres    false    246            y           0    0    permisos_id_permisos_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.permisos_id_permisos_seq', 4, true);
          public          postgres    false    234            z           0    0    persons_id_persona_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.persons_id_persona_seq', 29, true);
          public          postgres    false    216            {           0    0 )   productos_carrito_id_producto_carrito_seq    SEQUENCE SET     X   SELECT pg_catalog.setval('public.productos_carrito_id_producto_carrito_seq', 15, true);
          public          postgres    false    252            |           0    0    productos_id_producto_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.productos_id_producto_seq', 7, true);
          public          postgres    false    228            }           0    0 /   productos_promociones_id_producto_promocion_seq    SEQUENCE SET     ]   SELECT pg_catalog.setval('public.productos_promociones_id_producto_promocion_seq', 3, true);
          public          postgres    false    256            ~           0    0    promociones_id_promocion_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.promociones_id_promocion_seq', 3, true);
          public          postgres    false    254                       0    0    roles_id_rol_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.roles_id_rol_seq', 3, true);
          public          postgres    false    218            �           0    0    roles_menus_id_rol_menu_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.roles_menus_id_rol_menu_seq', 29, true);
          public          postgres    false    232            �           0    0 ,   roles_menus_permisos_id_rol_menu_permiso_seq    SEQUENCE SET     [   SELECT pg_catalog.setval('public.roles_menus_permisos_id_rol_menu_permiso_seq', 90, true);
          public          postgres    false    236            �           0    0     roles_usuario_id_rol_usuario_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.roles_usuario_id_rol_usuario_seq', 10, true);
          public          postgres    false    220            �           0    0 /   tipos_identificacion_id_tipo_identificacion_seq    SEQUENCE SET     ]   SELECT pg_catalog.setval('public.tipos_identificacion_id_tipo_identificacion_seq', 1, true);
          public          postgres    false    214            �           0    0 (   user_metodospago_id_user_metodo_pago_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public.user_metodospago_id_user_metodo_pago_seq', 1, false);
          public          postgres    false    244            �           0    0    users_id_usuario_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.users_id_usuario_seq', 6, true);
          public          postgres    false    222            b           2606    16590 )   categorias PK_04bae980e284752e914bce1cbc7 
   CONSTRAINT     s   ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT "PK_04bae980e284752e914bce1cbc7" PRIMARY KEY (id_categoria);
 U   ALTER TABLE ONLY public.categorias DROP CONSTRAINT "PK_04bae980e284752e914bce1cbc7";
       public            postgres    false    225            Z           2606    16572 ,   roles_usuario PK_1e0f189fad9d5bf068da3cdd119 
   CONSTRAINT     x   ALTER TABLE ONLY public.roles_usuario
    ADD CONSTRAINT "PK_1e0f189fad9d5bf068da3cdd119" PRIMARY KEY (id_rol_usuario);
 X   ALTER TABLE ONLY public.roles_usuario DROP CONSTRAINT "PK_1e0f189fad9d5bf068da3cdd119";
       public            postgres    false    221            V           2606    16563 $   roles PK_25f8d4161f00a1dd1cbe5068695 
   CONSTRAINT     h   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_25f8d4161f00a1dd1cbe5068695" PRIMARY KEY (id_rol);
 P   ALTER TABLE ONLY public.roles DROP CONSTRAINT "PK_25f8d4161f00a1dd1cbe5068695";
       public            postgres    false    219            d           2606    16597 %   marcas PK_5fc3058a1b5da0007232e4ee5e0 
   CONSTRAINT     k   ALTER TABLE ONLY public.marcas
    ADD CONSTRAINT "PK_5fc3058a1b5da0007232e4ee5e0" PRIMARY KEY (id_marca);
 Q   ALTER TABLE ONLY public.marcas DROP CONSTRAINT "PK_5fc3058a1b5da0007232e4ee5e0";
       public            postgres    false    227            L           2606    16548 &   persons PK_70636deb5f1ec552f25527a7ea9 
   CONSTRAINT     n   ALTER TABLE ONLY public.persons
    ADD CONSTRAINT "PK_70636deb5f1ec552f25527a7ea9" PRIMARY KEY (id_persona);
 R   ALTER TABLE ONLY public.persons DROP CONSTRAINT "PK_70636deb5f1ec552f25527a7ea9";
       public            postgres    false    217            H           2606    16539 3   tipos_identificacion PK_7aa358ab322a3eb86b9e45cdac9 
   CONSTRAINT     �   ALTER TABLE ONLY public.tipos_identificacion
    ADD CONSTRAINT "PK_7aa358ab322a3eb86b9e45cdac9" PRIMARY KEY (id_tipo_identificacion);
 _   ALTER TABLE ONLY public.tipos_identificacion DROP CONSTRAINT "PK_7aa358ab322a3eb86b9e45cdac9";
       public            postgres    false    215            f           2606    16604 (   productos PK_8c832a65b374c16cbd8135d6be5 
   CONSTRAINT     q   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT "PK_8c832a65b374c16cbd8135d6be5" PRIMARY KEY (id_producto);
 T   ALTER TABLE ONLY public.productos DROP CONSTRAINT "PK_8c832a65b374c16cbd8135d6be5";
       public            postgres    false    229            \           2606    16579 $   users PK_b2826bc9a58e9aba252457ad50b 
   CONSTRAINT     l   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_b2826bc9a58e9aba252457ad50b" PRIMARY KEY (id_usuario);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_b2826bc9a58e9aba252457ad50b";
       public            postgres    false    223            ^           2606    16583 $   users REL_51b2bc0fe3ba314f015d2b5428 
   CONSTRAINT     g   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "REL_51b2bc0fe3ba314f015d2b5428" UNIQUE (id_persona);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "REL_51b2bc0fe3ba314f015d2b5428";
       public            postgres    false    223            N           2606    16550 &   persons UQ_540fb616ae94450a79976d6f4a4 
   CONSTRAINT     f   ALTER TABLE ONLY public.persons
    ADD CONSTRAINT "UQ_540fb616ae94450a79976d6f4a4" UNIQUE (celular);
 R   ALTER TABLE ONLY public.persons DROP CONSTRAINT "UQ_540fb616ae94450a79976d6f4a4";
       public            postgres    false    217            P           2606    16556 &   persons UQ_59d27b64b494b4983c3c875e3c1 
   CONSTRAINT     m   ALTER TABLE ONLY public.persons
    ADD CONSTRAINT "UQ_59d27b64b494b4983c3c875e3c1" UNIQUE (identificacion);
 R   ALTER TABLE ONLY public.persons DROP CONSTRAINT "UQ_59d27b64b494b4983c3c875e3c1";
       public            postgres    false    217            J           2606    16541 3   tipos_identificacion UQ_78d6b82be470e68144e6ad03207 
   CONSTRAINT     r   ALTER TABLE ONLY public.tipos_identificacion
    ADD CONSTRAINT "UQ_78d6b82be470e68144e6ad03207" UNIQUE (nombre);
 _   ALTER TABLE ONLY public.tipos_identificacion DROP CONSTRAINT "UQ_78d6b82be470e68144e6ad03207";
       public            postgres    false    215            X           2606    16565 $   roles UQ_ca8fda234bfac251ac6e27e07f4 
   CONSTRAINT     c   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "UQ_ca8fda234bfac251ac6e27e07f4" UNIQUE (nombre);
 P   ALTER TABLE ONLY public.roles DROP CONSTRAINT "UQ_ca8fda234bfac251ac6e27e07f4";
       public            postgres    false    219            R           2606    16554 &   persons UQ_ceddb80a0cdec24118603b5c698 
   CONSTRAINT     e   ALTER TABLE ONLY public.persons
    ADD CONSTRAINT "UQ_ceddb80a0cdec24118603b5c698" UNIQUE (correo);
 R   ALTER TABLE ONLY public.persons DROP CONSTRAINT "UQ_ceddb80a0cdec24118603b5c698";
       public            postgres    false    217            T           2606    16552 &   persons UQ_f92ab17dcdce8ddc5d9f6fba12c 
   CONSTRAINT     g   ALTER TABLE ONLY public.persons
    ADD CONSTRAINT "UQ_f92ab17dcdce8ddc5d9f6fba12c" UNIQUE (telefono);
 R   ALTER TABLE ONLY public.persons DROP CONSTRAINT "UQ_f92ab17dcdce8ddc5d9f6fba12c";
       public            postgres    false    217            `           2606    16581 $   users UQ_fe0bb3f6520ee0469504521e710 
   CONSTRAINT     e   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710";
       public            postgres    false    223            |           2606    17362 $   carrito_compras carrito_compras_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.carrito_compras
    ADD CONSTRAINT carrito_compras_pkey PRIMARY KEY (id_carrito);
 N   ALTER TABLE ONLY public.carrito_compras DROP CONSTRAINT carrito_compras_pkey;
       public            postgres    false    251            z           2606    17287 4   detalle_nota_de_credito detalle_nota_de_credito_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.detalle_nota_de_credito
    ADD CONSTRAINT detalle_nota_de_credito_pkey PRIMARY KEY (id_detalle_nota_credito);
 ^   ALTER TABLE ONLY public.detalle_nota_de_credito DROP CONSTRAINT detalle_nota_de_credito_pkey;
       public            postgres    false    249            t           2606    17227 #   detalle_factura detallefactura_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT detallefactura_pkey PRIMARY KEY (id_detalle_factura);
 M   ALTER TABLE ONLY public.detalle_factura DROP CONSTRAINT detallefactura_pkey;
       public            postgres    false    243            r           2606    17199    facturas factura_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT factura_pkey PRIMARY KEY (id_factura);
 ?   ALTER TABLE ONLY public.facturas DROP CONSTRAINT factura_pkey;
       public            postgres    false    241            h           2606    16960    menus menus_pk 
   CONSTRAINT     Q   ALTER TABLE ONLY public.menus
    ADD CONSTRAINT menus_pk PRIMARY KEY (id_menu);
 8   ALTER TABLE ONLY public.menus DROP CONSTRAINT menus_pk;
       public            postgres    false    231            p           2606    17172    metodos_pago metodospago_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.metodos_pago
    ADD CONSTRAINT metodospago_pkey PRIMARY KEY (id_metodo_pago);
 G   ALTER TABLE ONLY public.metodos_pago DROP CONSTRAINT metodospago_pkey;
       public            postgres    false    239            x           2606    17270 $   nota_de_credito nota_de_credito_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.nota_de_credito
    ADD CONSTRAINT nota_de_credito_pkey PRIMARY KEY (id_nota_credito);
 N   ALTER TABLE ONLY public.nota_de_credito DROP CONSTRAINT nota_de_credito_pkey;
       public            postgres    false    247            l           2606    17020    permisos permisos_pk 
   CONSTRAINT     Z   ALTER TABLE ONLY public.permisos
    ADD CONSTRAINT permisos_pk PRIMARY KEY (id_permiso);
 >   ALTER TABLE ONLY public.permisos DROP CONSTRAINT permisos_pk;
       public            postgres    false    235            ~           2606    17386 (   productos_carrito productos_carrito_pkey 
   CONSTRAINT     w   ALTER TABLE ONLY public.productos_carrito
    ADD CONSTRAINT productos_carrito_pkey PRIMARY KEY (id_producto_carrito);
 R   ALTER TABLE ONLY public.productos_carrito DROP CONSTRAINT productos_carrito_pkey;
       public            postgres    false    253            �           2606    17483 0   productos_promociones productos_promociones_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.productos_promociones
    ADD CONSTRAINT productos_promociones_pkey PRIMARY KEY (id_producto_promocion);
 Z   ALTER TABLE ONLY public.productos_promociones DROP CONSTRAINT productos_promociones_pkey;
       public            postgres    false    257            �           2606    17476    promociones promociones_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.promociones
    ADD CONSTRAINT promociones_pkey PRIMARY KEY (id_promocion);
 F   ALTER TABLE ONLY public.promociones DROP CONSTRAINT promociones_pkey;
       public            postgres    false    255            n           2606    17026 ,   roles_menus_permisos roles_menus_permisos_pk 
   CONSTRAINT     {   ALTER TABLE ONLY public.roles_menus_permisos
    ADD CONSTRAINT roles_menus_permisos_pk PRIMARY KEY (id_rol_menu_permiso);
 V   ALTER TABLE ONLY public.roles_menus_permisos DROP CONSTRAINT roles_menus_permisos_pk;
       public            postgres    false    237            j           2606    16966    roles_menus roles_menus_pk 
   CONSTRAINT     a   ALTER TABLE ONLY public.roles_menus
    ADD CONSTRAINT roles_menus_pk PRIMARY KEY (id_rol_menu);
 D   ALTER TABLE ONLY public.roles_menus DROP CONSTRAINT roles_menus_pk;
       public            postgres    false    233            v           2606    17251 &   user_metodospago user_metodospago_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.user_metodospago
    ADD CONSTRAINT user_metodospago_pkey PRIMARY KEY (id_user_metodo_pago);
 P   ALTER TABLE ONLY public.user_metodospago DROP CONSTRAINT user_metodospago_pkey;
       public            postgres    false    245            �           2606    16610 ,   roles_usuario FK_013eb7dae5083c5db91e4f30233    FK CONSTRAINT     �   ALTER TABLE ONLY public.roles_usuario
    ADD CONSTRAINT "FK_013eb7dae5083c5db91e4f30233" FOREIGN KEY (id_usuario) REFERENCES public.users(id_usuario);
 X   ALTER TABLE ONLY public.roles_usuario DROP CONSTRAINT "FK_013eb7dae5083c5db91e4f30233";
       public          postgres    false    221    3932    223            �           2606    16615 ,   roles_usuario FK_3a4cc4842420653961937c0a791    FK CONSTRAINT     �   ALTER TABLE ONLY public.roles_usuario
    ADD CONSTRAINT "FK_3a4cc4842420653961937c0a791" FOREIGN KEY (id_rol) REFERENCES public.roles(id_rol);
 X   ALTER TABLE ONLY public.roles_usuario DROP CONSTRAINT "FK_3a4cc4842420653961937c0a791";
       public          postgres    false    221    3926    219            �           2606    16620 $   users FK_51b2bc0fe3ba314f015d2b54285    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_51b2bc0fe3ba314f015d2b54285" FOREIGN KEY (id_persona) REFERENCES public.persons(id_persona);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "FK_51b2bc0fe3ba314f015d2b54285";
       public          postgres    false    217    223    3916            �           2606    16630 (   productos FK_67e14062fdfd39fba436bccaff3    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT "FK_67e14062fdfd39fba436bccaff3" FOREIGN KEY (id_categoria) REFERENCES public.categorias(id_categoria);
 T   ALTER TABLE ONLY public.productos DROP CONSTRAINT "FK_67e14062fdfd39fba436bccaff3";
       public          postgres    false    225    229    3938            �           2606    16625 (   productos FK_a58213766e755fa6e6b5afeb5c9    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT "FK_a58213766e755fa6e6b5afeb5c9" FOREIGN KEY (id_marca) REFERENCES public.marcas(id_marca);
 T   ALTER TABLE ONLY public.productos DROP CONSTRAINT "FK_a58213766e755fa6e6b5afeb5c9";
       public          postgres    false    229    227    3940            �           2606    16605 &   persons FK_ab67fd9766128dd705078b25665    FK CONSTRAINT     �   ALTER TABLE ONLY public.persons
    ADD CONSTRAINT "FK_ab67fd9766128dd705078b25665" FOREIGN KEY (id_tipo_identificacion) REFERENCES public.tipos_identificacion(id_tipo_identificacion);
 R   ALTER TABLE ONLY public.persons DROP CONSTRAINT "FK_ab67fd9766128dd705078b25665";
       public          postgres    false    217    3912    215            �           2606    17233 .   detalle_factura detallefactura_id_factura_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT detallefactura_id_factura_fkey FOREIGN KEY (id_factura) REFERENCES public.facturas(id_factura);
 X   ALTER TABLE ONLY public.detalle_factura DROP CONSTRAINT detallefactura_id_factura_fkey;
       public          postgres    false    3954    243    241            �           2606    17228 /   detalle_factura detallefactura_id_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_factura
    ADD CONSTRAINT detallefactura_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);
 Y   ALTER TABLE ONLY public.detalle_factura DROP CONSTRAINT detallefactura_id_producto_fkey;
       public          postgres    false    243    229    3942            �           2606    17205 #   facturas factura_id_metodopago_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT factura_id_metodopago_fkey FOREIGN KEY (id_metodopago) REFERENCES public.metodos_pago(id_metodo_pago);
 M   ALTER TABLE ONLY public.facturas DROP CONSTRAINT factura_id_metodopago_fkey;
       public          postgres    false    239    3952    241            �           2606    17200    facturas factura_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.facturas
    ADD CONSTRAINT factura_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_usuario);
 G   ALTER TABLE ONLY public.facturas DROP CONSTRAINT factura_id_user_fkey;
       public          postgres    false    223    3932    241            �           2606    17392    productos_carrito fk_carrito    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos_carrito
    ADD CONSTRAINT fk_carrito FOREIGN KEY (id_carrito) REFERENCES public.carrito_compras(id_carrito);
 F   ALTER TABLE ONLY public.productos_carrito DROP CONSTRAINT fk_carrito;
       public          postgres    false    3964    253    251            �           2606    17271    nota_de_credito fk_factura    FK CONSTRAINT     �   ALTER TABLE ONLY public.nota_de_credito
    ADD CONSTRAINT fk_factura FOREIGN KEY (id_factura) REFERENCES public.facturas(id_factura);
 D   ALTER TABLE ONLY public.nota_de_credito DROP CONSTRAINT fk_factura;
       public          postgres    false    247    241    3954            �           2606    17288 '   detalle_nota_de_credito fk_nota_credito    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_nota_de_credito
    ADD CONSTRAINT fk_nota_credito FOREIGN KEY (id_nota_credito) REFERENCES public.nota_de_credito(id_nota_credito);
 Q   ALTER TABLE ONLY public.detalle_nota_de_credito DROP CONSTRAINT fk_nota_credito;
       public          postgres    false    247    249    3960            �           2606    17293 #   detalle_nota_de_credito fk_producto    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_nota_de_credito
    ADD CONSTRAINT fk_producto FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);
 M   ALTER TABLE ONLY public.detalle_nota_de_credito DROP CONSTRAINT fk_producto;
       public          postgres    false    229    249    3942            �           2606    17387    productos_carrito fk_producto    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos_carrito
    ADD CONSTRAINT fk_producto FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);
 G   ALTER TABLE ONLY public.productos_carrito DROP CONSTRAINT fk_producto;
       public          postgres    false    229    253    3942            �           2606    17484 +   productos_promociones fk_producto_promocion    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos_promociones
    ADD CONSTRAINT fk_producto_promocion FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);
 U   ALTER TABLE ONLY public.productos_promociones DROP CONSTRAINT fk_producto_promocion;
       public          postgres    false    257    229    3942            �           2606    17489 "   productos_promociones fk_promocion    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos_promociones
    ADD CONSTRAINT fk_promocion FOREIGN KEY (id_promocion) REFERENCES public.promociones(id_promocion);
 L   ALTER TABLE ONLY public.productos_promociones DROP CONSTRAINT fk_promocion;
       public          postgres    false    257    255    3968            �           2606    17276    nota_de_credito fk_usuario    FK CONSTRAINT     �   ALTER TABLE ONLY public.nota_de_credito
    ADD CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES public.users(id_usuario);
 D   ALTER TABLE ONLY public.nota_de_credito DROP CONSTRAINT fk_usuario;
       public          postgres    false    247    3932    223            �           2606    17363    carrito_compras fk_usuario    FK CONSTRAINT     �   ALTER TABLE ONLY public.carrito_compras
    ADD CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES public.users(id_usuario);
 D   ALTER TABLE ONLY public.carrito_compras DROP CONSTRAINT fk_usuario;
       public          postgres    false    3932    223    251            �           2606    17092 $   roles_menus roles_menus_id_menu_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.roles_menus
    ADD CONSTRAINT roles_menus_id_menu_fkey FOREIGN KEY (id_menu) REFERENCES public.menus(id_menu);
 N   ALTER TABLE ONLY public.roles_menus DROP CONSTRAINT roles_menus_id_menu_fkey;
       public          postgres    false    3944    233    231            �           2606    17087 #   roles_menus roles_menus_id_rol_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.roles_menus
    ADD CONSTRAINT roles_menus_id_rol_fkey FOREIGN KEY (id_rol) REFERENCES public.roles(id_rol);
 M   ALTER TABLE ONLY public.roles_menus DROP CONSTRAINT roles_menus_id_rol_fkey;
       public          postgres    false    233    219    3926            �           2606    17037 9   roles_menus_permisos roles_menus_permisos_id_permiso_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.roles_menus_permisos
    ADD CONSTRAINT roles_menus_permisos_id_permiso_fkey FOREIGN KEY (id_permiso) REFERENCES public.permisos(id_permiso);
 c   ALTER TABLE ONLY public.roles_menus_permisos DROP CONSTRAINT roles_menus_permisos_id_permiso_fkey;
       public          postgres    false    237    3948    235            �           2606    17027 :   roles_menus_permisos roles_menus_permisos_id_rol_menu_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.roles_menus_permisos
    ADD CONSTRAINT roles_menus_permisos_id_rol_menu_fkey FOREIGN KEY (id_rol_menu) REFERENCES public.roles_menus(id_rol_menu);
 d   ALTER TABLE ONLY public.roles_menus_permisos DROP CONSTRAINT roles_menus_permisos_id_rol_menu_fkey;
       public          postgres    false    3946    237    233            �           2606    17257 3   user_metodospago user_metodospago_metodopagoid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_metodospago
    ADD CONSTRAINT user_metodospago_metodopagoid_fkey FOREIGN KEY (id_metodo_pago) REFERENCES public.metodos_pago(id_metodo_pago);
 ]   ALTER TABLE ONLY public.user_metodospago DROP CONSTRAINT user_metodospago_metodopagoid_fkey;
       public          postgres    false    239    3952    245            �           2606    17252 -   user_metodospago user_metodospago_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_metodospago
    ADD CONSTRAINT user_metodospago_userid_fkey FOREIGN KEY (id_user) REFERENCES public.users(id_usuario);
 W   ALTER TABLE ONLY public.user_metodospago DROP CONSTRAINT user_metodospago_userid_fkey;
       public          postgres    false    223    3932    245            O      x�3�4�tt�2�4�1z\\\ &�c      5   O   x�˻� ��o�H�M��e�4�@���?Q�����>��6ltsw톝��Yx�ᠫH��I��稆�ڤ�'����      G   Z   x�U��� C�s<LE �t��?G�C�9�/�L�alF��'8�z��-���ʫ��z	O0�W���ݟb���ꥼ:e����q����� �      M      x�34�44�4�4�440�35������ %z%      E   ]  x�u��n� ���.E��`v��&u��N{��I �H��|��J�P8A<! z}���Arzty~}�o?��Ӡ�G`)Lh��:j�Q�p{�~���S����Qx�'�S����ʫ+�����G��i(ԯ�,Z���Y���r��rEQ��7�6e!��.���v_p�YTw�m�>��Rݠ�R�]H*��{���bft���I�Bw�TBP`�tL='��Z`'ϲ���xYZ��p��`�s=�/���AW<z���(�Z�pt�r�A?ȗ,�8l���n����LY��K\y�]����Թ³��d���������{~ފ�=6�������9k�?���      7      x�3��u
��2��������� -�       ;   �   x�=�I�0E�p����a�l'B�M���E���ś�x�? �*�4�-�LgH��8r�6���o�q�BPr��>M���]�U��5'�7�Y7�	T<�Ƨ;8�j�q��R1��['�!�é�z�e,E�j�W�S���#1\      C   `   x�3�I,�J-ITHI��̒|N�ļ�|����̼�D]��{ibebaif��s�'�����,z!*�9+s��2�JJ����qqq �
+i      K   P   x�34�4202�50�56�445�35�tI-��)M�<�9O� �H��(?�4�$_!%5-5��4�8��ȔӔ�1 ȟ+F��� ���      ?   2   x�3��u��r�2�tr�Ɯ�.�!@�	����������� ��
@      -   �   x���;�0��)� Ȼ��Q (�+ad'(�'NO 4 "�y3-��\�B*���ioT���T��	t����X�R�C�q<l��;��i-d.�hS��f0
X줂	_|h�]j���=�ud	�d$r�ܴr������(���s����MY�����yD�+�Ik����6I��Z�R��c�      9   �   x���A
� ���)<��ɺ�����`\��Qbr��kJ!d�*v9�y|>c�2�nqs`�g��q� 	.� %������e>�el�XrS]�~��1���� �����ז��VY[m��A�@"em�l*�u���	�]Q��2k�ݟ���9�K�sD� H�Ο      Q   9   x���  �P�]�^�YC	�@�B3��N����_(<"G7*�6���|X�	B      U      x�3�4�4�2�B.cN ����� !��      S   V   x�3�(���O���SHIUK-J���4202�50�56�2�t�,9�C��8]�
�J�3�,)J�(L�/ơ��5ؙ+F���  ��      /   /   x�3�tt����tt�2�s�squ�s�9�}<]�B\��=... �	�      =   o   x���D1ϙbV1�|zy�ױ�2#���a�\���Ylss��5/�|hvLH�@]���B�������<V�kz�!�u	u`>t"��DZE���m�M�#o���z�|?����      A   O  x�=�;�#1�>�V�O�S{�����	8{c���i�A�����њ=�?�3ы+!n�`��e^l�?8����/�\�"_^^�ɍ���tr&�J��Nl;q�D؉k_t7�t7��W���|�=8_��//Η7�ˇ���|�r�x}Ηފ_wΗ�˓������|9�;t�� �*2���\��:��+�����Øt͏E����K��!��o/]�������oXi��'�;�So|3�~��w�����'�nX��̂�'�=� ����:�{F��(�Z��+��p�c�}��slF�#��H�e�����#��Z$ę�ĕ����|>�_*�=      1   .   x�3�tt�4�4� �L8��,�,SNc.C���N3 3F��� ���      +      x�3�t��tt����� {Z      I      x������ � �      3   ,  x�m�Kr�0  �u8�["\R�E��7i����-�v����A���"M{K��@	*S	M�&�<���VTЄ�ŷ��]\�Ǵ��W�s���X��L=���m��옹�A���W���<����:\�x�:?�4��M�D��DC�=����լW�ٮ�r{�-�m��K.2Jp��J�v/:u��b�Y[�ެ��G��>�+}�81��cg��;��J�	�$-��k1���2�gSDh�b]��;�ɵ��2���t�S�]��Fp�=��]����p�DA� ��y�     