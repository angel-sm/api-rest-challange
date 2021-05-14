/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unreachable */
/* eslint-disable array-callback-return */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import axios from 'axios';
import fs from 'fs';
import { Response } from 'express';
import { ProtectedRepository } from '../../ports/protected';

export class ProtectedService implements ProtectedRepository {
  fetchData(url: string): Promise<any> {
    return axios.request({
      method: 'GET',
      url,
      responseType: 'arraybuffer',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
  }

  generateFile(url: string, res: Response): any {
    const writeStream = fs.createWriteStream('tags.xlsx');

    return this.fetchData(url)
      .then((htmlPage) => {
        let data = htmlPage.data;

        data = data.toString('latin1');

        const regexTagsA: RegExp = /<a[^>]*>([^<]+)<\/a>/g;
        const listTagsA = data.match(regexTagsA);

        const header = 'TAG VALUES' + '\t' + 'HREF VALUES' + '\n';
        writeStream.write(header);

        return listTagsA;
      })
      .then((listTagsA) => {
        listTagsA?.map((tag: any) => {
          const regexHref: RegExp = /href="(.*?)"/g;
          const hrefValue = tag.match(regexHref);

          const regexTagValue: RegExp = />(.*?)</g;
          const [tagValue]: Array<string>|undefined|any = tag.match(regexTagValue) || [];

          writeStream.write(`${tagValue.replace(/[>, <]/g, '')} \t ${hrefValue} \n`);
        });
        writeStream.close();
      })
      .then(() => {
        const read = fs.createReadStream('tags.xlsx');
        read.pipe(res);
        read.on('error', (err) => res.status(500).json({ error: 'Error al leer el archivo' }));
      })
      .catch((error) => res.status(500).json({ error: 'Error en el servicio de generar archivo' }));
  }
}
