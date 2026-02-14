import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async identifyIngredients(imageBuffer: Buffer) {
  const base64Image = imageBuffer.toString('base64');

  const response = await this.openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
Identify all food ingredients visible in this image.
Return ONLY valid JSON in this format:

{
  "ingredients": string[]
}

Do not include explanation.
If none found, return empty array.
`
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    temperature: 0,
  });

  const content = response.choices[0].message.content;
  return JSON.parse(content!);
}

}
