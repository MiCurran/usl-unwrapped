import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('docs')
export class DocumentationController {
  @Get(':fileName')
  serveMarkdown(@Param('fileName') fileName: string, @Res() res: Response) {
    // Specify the path to the Markdown file
    const filePath = join(__dirname, '..', 'docs', `${fileName}.md`);

    // Send the file as a response
    res.sendFile(filePath);
  }
}
