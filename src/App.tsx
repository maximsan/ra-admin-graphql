import { FC, useEffect, useState } from 'react';
import { appTitle } from './config';
import {
  Admin,
  Resource,
  TextField,
  List,
  SimpleList,
  Datagrid,
  ReferenceField,
  EditButton,
  ResourceComponentProps,
  Loading,
  ListGuesser,
  NumberField,
  DateField,
  ArrayField,
  SingleFieldList,
  ChipField,
  ReferenceArrayField,
} from 'react-admin';
import { authProvider } from './providers/authProvider';
// import { dataProvider } from './providers/dataProvider';

// @ts-ignore
import buildGraphQLProvider from 'ra-data-graphql-simple';
import { useMediaQuery } from '@material-ui/core';

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const PostList = (props: any) => {
  // @ts-ignore
  const isSmall = useMediaQuery((t) => t.breakpoints.down('sm'));

  console.log('props', props);
  return (
    <List {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.title}
          secondaryText={(record) => `${record.views} views`}
          tertiaryText={(record) => new Date(record.published_at).toLocaleDateString()}
        />
      ) : (
        <Datagrid rowClick='edit'>
          <TextField source='id' />
          <TextField source='title' />
          <NumberField source='views' />
        </Datagrid>
      )}
    </List>
  );
};

export const App: FC = () => {
  const [provider, setProvider] = useState<any>();
  useEffect(() => {
    const getBuildProvider = async () => {
      const dp = await buildGraphQLProvider({
        clientOptions: {
          uri: 'http://localhost:4000',
        },
      });
      setProvider(() => dp);
    };
    getBuildProvider();
  }, []);

  if (!provider) {
    return <Loading />;
  }

  //TODO: just for testing we use json-graphql-server with fake data as for now, will be changed into real data
  return (
    <Admin authProvider={authProvider} dataProvider={provider}>
      <Resource name='Post' list={PostList} />
    </Admin>
  );
};

// class App extends Component {
//   constructor() {
//     super();
//     this.state = { dataProvider: null };
//   }
//   componentDidMount() {
//     buildGraphQLProvider({ clientOptions: { uri: 'http://localhost:4000' }})
//       .then(dataProvider => this.setState({ dataProvider }));
//   }
//
//   render() {
//     const { dataProvider } = this.state;
//
//     if (!dataProvider) {
//       return <div>Loading</div>;
//     }
//
//     return (
//       <Admin dataProvider={dataProvider}>
//         <Resource name="Post" list={PostList} edit={PostEdit} create={PostCreate} />
//       </Admin>
//     );
//   }
// }
