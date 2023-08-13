import { api } from '../../lib/api';

interface IOptionsData {
  name: string;
  id: number;
}

/** Fetch data to populate options for Radio Buttons and Selects components
 * @param optionsData the slug for the options data fetcher;
 * @returns the options formatted to a pair of value / label object. */

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
