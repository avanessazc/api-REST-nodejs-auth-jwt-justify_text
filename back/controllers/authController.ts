import { Request, Response } from 'express';

export  const api_token_post = (req: Request, res: Response) => {
    const {email, password } = req.body

    res.send(`${email}, ${password}`)
} 
