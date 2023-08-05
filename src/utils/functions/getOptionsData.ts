import { api } from '../../lib/api';

interface IOptionsData {
  name: string;
  id: number;
}

export default async function getOptionsData(optionsData: string) {
  try {
    const { data } = await api.get(optionsData);

    const formattedData = data.map((e: IOptionsData) => ({
      value: e.id,
      label: e.name,
    }));

    return formattedData;
  } catch (error) {
    console.error('Error: Cannot fetch configuration data');
  }
}
