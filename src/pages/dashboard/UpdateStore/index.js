// import React, { useEffect, useState, useRef } from 'react';
// import PropTypes from 'prop-types';
// import * as Yup from 'yup';
// import { Form } from '@unform/web';
// import { useDispatch } from 'react-redux';

// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import { FaCheckSquare, FaSquare } from 'react-icons/fa';
// import Input from '../../../components/Input';
// import Img from '../../../components/Img';
// import { updateStoreRequest } from '../../../store/modules/store/actions';
// import LoadingIcon from '../../../components/LoadingIcon';

// import {
//   Container,
//   ImageInputs,
//   ProductImage,
//   // SubContainer,
//   ProductsArea,
// } from './styles';
// import { SaveButton } from '../../../components/Buttons';

// import api from '../../../services/api';
// import { Table, Td, Th, Tr } from '../../../components/Table';

// function UpdateStore({ match }) {
//   const formRef = useRef(null);

//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);
//   const [store, setStore] = useState({});
//   const id = Number(match.params.id);

//   useEffect(() => {
//     async function getStore() {
//       try {
//         const response = await api.get(`stores/${id}`);
//         setStore(response.data);
//         formRef.current.setData(response.data);
//         setLoading(false);
//       } catch (err) {
//         toast.error('Houve um erro ao carregar as informações da loja');
//         console.tron.log(err);

//         setLoading(false);
//       }
//     }
//     console.tron.log(formRef);

//     getStore();
//   }, []);

//   async function submitHandle(data) {
//     try {
//       formRef.current.setErrors({});

//       const schema = Yup.object().shape({
//         name: Yup.string()
//           .max(50, 'Máximo de 50 caracteres')
//           .required('O nome é obrigatório'),
//         url: Yup.string()
//           .max(50, 'Máximo de 50 caracteres')
//           .required('A URL é obrigatória'),
//         address: Yup.string().max(100, 'Máximo de 100 caracteres'),
//         city: Yup.string().max(100, 'Máximo de 100 caracteres'),
//         phone: Yup.string().max(100, 'Máximo de 100 caracteres'),
//         whatsapp: Yup.string().max(100, 'Máximo de 100 caracteres'),
//         instagram: Yup.string().max(100, 'Máximo de 100 caracteres'),
//         facebook: Yup.string().max(100, 'Máximo de 100 caracteres'),
//         logoId: Yup.number().required('Selecione uma logo'),
//         coverId: Yup.number(),
//       });
//       await schema.validate(data, {
//         abortEarly: false,
//       });

//       // dispatch(updateStoreRequest(id, data));
//     } catch (err) {
//       const validationErrors = {};
//       if (err instanceof Yup.ValidationError) {
//         err.inner.forEach((error) => {
//           validationErrors[error.path] = error.message;
//         });
//         formRef.current.setErrors(validationErrors);
//       }
//     }
//   }
//   return (
//     <Container>
//       {loading ? (
//         <LoadingIcon />
//       ) : (
//         <>
//           <h2>Editar loja</h2>
//           <Form ref={formRef} onSubmit={submitHandle}>
//             {/* <ImageInputs>
//               <Img name="logo" submitName="logoId" label="Logo:" />
//               <Img
//                 name="cover"
//                 submitName="coverId"
//                 label="Imagem da campanha:"
//               />
//             </ImageInputs> */}

//             <Input
//               name="name"
//               placeholder="Insira o nome da loja"
//               label="Nome:"
//             />

//             <Input name="url" placeholder="Insira a URL" label="URL:" />

//             <Input
//               name="address"
//               placeholder="Insira o endereço"
//               label="Endereço:"
//             />

//             <Input name="city" placeholder="Insira a cidade" label="Cidade:" />

//             <Input
//               name="phone"
//               placeholder="Insira o telefone"
//               label="Telefone:"
//             />

//             <Input
//               name="whatsapp"
//               placeholder="Insira o Whatsapp"
//               label="Whatsapp:"
//             />

//             <Input
//               name="instagram"
//               placeholder="Insira o Instagram"
//               label="Instagram:"
//             />

//             <Input
//               name="facebook"
//               placeholder="Insira o Facebook"
//               label="Facebook:"
//             />
//             <SaveButton type="submit">Salvar</SaveButton>
//           </Form>
//           {/* <ProductsArea>
//             <label> Produtos</label>
//             <Table>
//               <Tr>
//                 <Th>Imagem</Th>
//                 <Th>Nome</Th>
//                 <Th>Preço</Th>
//                 <Th>Destaque</Th>
//               </Tr>
//               {store &&
//                 store.products.map((product) => (
//                   <Tr key={product.id}>
//                     <Td>
//                       <ProductImage
//                         src={product.image.url}
//                         alt={product.name}
//                       />
//                     </Td>
//                     <Td>
//                       <Link to={`/updateproduct/${product.id}`}>
//                         {product.name}
//                       </Link>
//                     </Td>
//                     <Td>{product.price}</Td>
//                     <Td>
//                       {product.featured ? (
//                         <FaCheckSquare color="#4d88ff" />
//                       ) : (
//                         <FaSquare color="#dbdbdb" />
//                       )}
//                     </Td>
//                   </Tr>
//                 ))}
//             </Table>
//           </ProductsArea> */}
//         </>
//       )}
//     </Container>
//   );
// }

// export default UpdateStore;

// UpdateStore.propTypes = {
//   match: PropTypes.shape({
//     params: PropTypes.shape({
//       id: PropTypes.string.isRequired,
//     }).isRequired,
//   }).isRequired,
// };
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';
import {
  Container,
  ImageInputs,
  ProductImage,
  // SubContainer,
  ProductsArea,
} from './styles';
import api from '../../../services/api';
import Input from '../../../components/Input';
import Img from '../../../components/Img';

import { Table, Td, Th, Tr } from '../../../components/Table';
import { SaveButton } from '../../../components/Buttons';

import LoadingIcon from '../../../components/LoadingIcon';

import { updateStoreRequest } from '../../../store/modules/store/actions';

function UpdateStore({ match }) {
  const id = Number(match.params.id);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState({});

  const formRef = useRef(null);
  useEffect(() => {
    async function getStore() {
      try {
        const response = await api.get(`stores/${id}`);
        setLoading(false);
        setStore(response.data);
        formRef.current.setData(response.data);
      } catch (err) {
        toast.error('Houve um erro ao carregar as informações da loja');
        setLoading(false);
      }
    }

    getStore();
  }, []);
  async function submitHandle(data) {
    console.tron.log(data);

    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .max(50, 'Máximo de 50 caracteres')
          .required('O nome é obrigatório'),
        url: Yup.string()
          .max(50, 'Máximo de 50 caracteres')
          .required('A URL é obrigatória'),
        address: Yup.string().max(100, 'Máximo de 100 caracteres'),
        city: Yup.string().max(100, 'Máximo de 100 caracteres'),
        phone: Yup.string().max(100, 'Máximo de 100 caracteres'),
        whatsapp: Yup.string().max(100, 'Máximo de 100 caracteres'),
        instagram: Yup.string().max(100, 'Máximo de 100 caracteres'),
        facebook: Yup.string().max(100, 'Máximo de 100 caracteres'),
        logoId: Yup.number().required('Selecione uma logo'),
        coverId: Yup.number(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(updateStoreRequest(id, data));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }
  return (
    <Container>
      <Form ref={formRef} onSubmit={submitHandle}>
        {loading ? (
          <LoadingIcon />
        ) : (
          <>
            <ImageInputs>
              <Img name="logo" submitName="logoId" label="Logo:" />
              <Img
                name="cover"
                submitName="coverId"
                label="Imagem da campanha:"
              />
            </ImageInputs>
            <Input
              name="name"
              placeholder="Insira o nome da loja"
              label="Nome:"
            />
            <Input name="url" placeholder="Insira a URL" label="URL:" />
            <Input
              name="address"
              placeholder="Insira o endereço"
              label="Endereço:"
            />
            <Input name="city" placeholder="Insira a cidade" label="Cidade:" />
            <Input
              name="phone"
              placeholder="Insira o telefone"
              label="Telefone:"
            />
            <Input
              name="whatsapp"
              placeholder="Insira o Whatsapp"
              label="Whatsapp:"
            />
            <Input
              name="instagram"
              placeholder="Insira o Instagram"
              label="Instagram:"
            />
            <Input
              name="facebook"
              placeholder="Insira o Facebook"
              label="Facebook:"
            />
            <SaveButton type="submit">Salvar</SaveButton>
            <ProductsArea>
              <label> Produtos</label>
              <Table>
                <Tr>
                  <Th>Imagem</Th>
                  <Th>Nome</Th>
                  <Th>Preço</Th>
                  <Th>Destaque</Th>
                </Tr>
                {store &&
                  store.products &&
                  store.products.map((product) => (
                    <Tr key={product.id}>
                      <Td>
                        <ProductImage
                          src={product.image.url}
                          alt={product.name}
                        />
                      </Td>
                      <Td>
                        <Link to={`/updateproduct/${product.id}`}>
                          {product.name}
                        </Link>
                      </Td>
                      <Td>{product.price}</Td>
                      <Td>
                        {product.featured ? (
                          <FaCheckSquare color="#4d88ff" />
                        ) : (
                          <FaSquare color="#dbdbdb" />
                        )}
                      </Td>
                    </Tr>
                  ))}
              </Table>
            </ProductsArea>
          </>
        )}
      </Form>
    </Container>
  );
}

export default UpdateStore;

UpdateStore.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
