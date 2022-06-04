const prompts = require('prompts');
const redux=require('redux');
//criadora de ação para realizar o vestibular
const realizarVestibular = (nome,cpf)=> {
    const entre6E10 = Math.random() <=0.7;
    const nota = entre6E10 ? 6 + Math.random() * 4: Math.random() *6;
    return {
        type: "REALIZAR VESTIBULAR",
        payload: {
            nome, cpf, nota
        }
    }
}

// função criadora de ação
const realizarMatricula = (cpf, status) => {
    return {
        type: " REALIZAR_MATRICULA",
        payload: {cpf, status}
    }
}

//reducer manipula a seguinte lista
// [{cpf:1 , nome: " Ana, nota:10"}, {cpf:2 , nome: "Ana2", nota:10}]
const historicoVestibular = (historicoVestibularAtual = [], acao)=>{
    if(acao.type==="REALIZAR VESTIBULAR"){
        return[...historicoVestibularAtual,acao.payload]
    }
    return historicoVestibularAtual
}
//reducer manipula a seguinte lista
//[{cpf:1 , status:M}, {cpf:2 , status:M}}, {cpf:3 , status:NM}]
const historicoMatriculas=(historicoMatriculasAtual=[],acao)=>{
    if(acao.type==="REALIZAR_MATRICULA"){
        return [...historicoVestibularAtual.acao.payload]
    }
    return historicoMatriculasAtual
}

const todosDoReducers=redux.combineReducers({
    historicoMatriculas,
    historicoVestibular
})

const store=redux.createStore(todosDoReducers)

const main= async()=>{
    const menu="1-Realizar Vestibular\n2-Realizar Matricula\n3-Visualizar meu status\n4-Visualizar a lista de aprovados\n0-Sair"
    let responselike
    do{
        response=await prompts({
            type:"number",
            name:'op',
            message:menu
        })
        switch(response.op){
            case 1:
                //1 pegar nome do usuario 
                const {nome}= await prompts({typetype:'text',name:'nome',message:'Digite seu nome'})
                //2 pegar o cpf do usuario
                const {cpf}=await prompts({typetype:'text',name:'cpf',message:'Digite seu cpf'})
                //3 construir uma acao apropriada
                const {acao}= realizarVestibular(nome,cpf)
                //4 fazer dispatch da acao
                store.dispatch(acao)
                break;
            case 2:
                //1 pegar o cpf com prompts
                const {cpf2}=prompts({typetype:'text',name:'cpf',message:'Digite seu cpf'})
                //2Checar se a pessoa esta aprovada no estado centralizado(store.getState(). HistoricoVestibular.find)
                const aprovado=store.getState().historicoVestibular.find(aluno=>aluno.cpf===cpf&&aluno.nota>=6)
                store.dispatch(realizarMatricula(cpf,aprovado?"M":"NM"))                
                //3 Produzir uma acao apropriada: o status poderá ser M ou NM
                break;
        }
    }while(response.op!=0)
}