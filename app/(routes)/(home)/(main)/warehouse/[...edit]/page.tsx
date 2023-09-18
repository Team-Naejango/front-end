'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { GrFormNext } from 'react-icons/gr'
import { toast } from 'react-hot-toast'
import { ApiError } from 'next/dist/server/api-utils'
import mapIcon from '@/app/assets/image/map.svg'

import BackHeader from '@/app/components/template/main/header/BackHeader'
import InputField from '@/app/components/atom/InputField'
import { cls } from '@/app/libs/client/utils/util'
import TextArea from '@/app/components/atom/TextArea'
import Button from '@/app/components/atom/Button'
import InputFile from '@/app/components/atom/InputFile'
import SelectCoordinate from '@/app/components/organism/warehouse/SelectCoordinate'
import { CRUD } from '@/app/libs/client/constants/code'
import { ITEM, WAREHOUSE } from '@/app/libs/client/reactQuery/queryKey/warehouse'
import { AddressType } from '@/app/components/molecule/kakaomap/SearchAddress'
import { E_STEP, STEP } from '@/app/libs/client/constants/app/warehouse'

import { modifyStorage, saveStorage, storage, StorageParam } from '@/app/apis/domain/warehouse/warehouse'

interface WarehouseProps {
  name: string
  description: string
  imgUrl: string
  address: string
}

const WarehouseEdit = () => {
  const searchParams = useSearchParams()
  const query = useQueryClient()
  const router = useRouter()
  const [imageFile, setImageFile] = useState<FileList | null>(null)
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined)
  const [step, setStep] = useState<E_STEP>(STEP.위치정보)
  const [address, setAddress] = useState<AddressType>({
    value: '',
    coords: {
      latitude: null,
      longitude: null,
    },
  })

  const REGION = process.env.NEXT_PUBLIC_AWS_REGION
  const ACCESS_KEY_ID = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID
  const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY

  const crud = searchParams.get('crud') || CRUD.등록
  const seq = searchParams.get('seq') || null
  const isEditMode = (crud === CRUD.수정 && seq !== null) || false

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   setValue,
  //   reset,
  // } = useForm<WarehouseProps>({
  //   mode: 'onSubmit',
  //   reValidateMode: 'onChange',
  //   defaultValues: {
  //     imgUrl: undefined,
  //   },
  // })
  //
  // // 창고 조회
  // const { data: { data: _storageInfo } = {} } = useQuery([WAREHOUSE.조회], () => storage(), {
  //   enabled: isEditMode,
  // })
  // const { result } = _storageInfo || {}
  // const currentItem = result && result[Number(seq) - 1]
  //
  // // 창고 등록
  // const { mutate: mutateSave } = useMutation(saveStorage, {
  //   onSuccess: () => {
  //     query.invalidateQueries([WAREHOUSE.조회])
  //     query.invalidateQueries([ITEM.조회])
  //     toast.success('창고가 등록되었습니다.')
  //     router.push('/warehouse')
  //   },
  //   onError: (error: ApiError) => {
  //     toast.error(error.message)
  //   },
  // })
  //
  // // 창고 수정
  // const { mutate: mutateModify } = useMutation(modifyStorage, {
  //   onSuccess: () => {
  //     query.invalidateQueries([WAREHOUSE.조회])
  //     toast.success('창고가 수정되었습니다.')
  //     router.push('/warehouse')
  //   },
  //   onError: (error: ApiError) => {
  //     toast.error(error.message)
  //   },
  // })
  //
  // // S3 업로드
  // const uploadS3 = async (file: File) => {
  //   const s3Client = new S3Client({
  //     region: REGION,
  //     credentials: {
  //       accessKeyId: ACCESS_KEY_ID!,
  //       secretAccessKey: SECRET_ACCESS_KEY!,
  //     },
  //   })
  //
  //   try {
  //     const command = new PutObjectCommand({
  //       Bucket: 'naejango-s3-image',
  //       Key: `upload/warehouse/${file.name}`,
  //       ContentType: file.type,
  //       Body: file,
  //       ACL: 'public-read',
  //     })
  //     return await s3Client.send(command)
  //   } catch (error) {
  //     console.error('S3 업로드 에러:', error)
  //   }
  // }
  //
  // // 이미지 제한
  // let imgSizeConverted = ''
  // const limitedFileSize = (file: File) => {
  //   const imgSize = file.size
  //   const maxSize = 1024 * 1024 // 1MB
  //
  //   if (imgSize >= maxSize) {
  //     toast.error('이미지 용량은 1MB 이내로 등록 가능합니다.')
  //     return false
  //   }
  //
  //   if (imgSize < maxSize) {
  //     if (imgSize < 1024) {
  //       imgSizeConverted = imgSize + 'bytes'
  //     } else if (imgSize >= 1024 && imgSize < 1048576) {
  //       imgSizeConverted = (imgSize / 1024).toFixed(1) + 'KB'
  //     } else if (imgSize >= 1048576) {
  //       imgSizeConverted = (imgSize / 1048576).toFixed(1) + 'MB'
  //     }
  //   }
  //   return true
  // }
  //
  // const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files![0]
  //   const fileExt = file?.name.split('.').pop()
  //
  //   if (!file) return
  //   if (!['jpeg', 'png', 'jpg', 'JPG', 'PNG', 'JPEG'].includes(fileExt!)) {
  //     toast.error('jpg, png, jpg 파일만 업로드가 가능합니다.')
  //     event.target.value = ''
  //     return
  //   }
  //
  //   if (!limitedFileSize(file)) {
  //     event.target.value = ''
  //     return
  //   }
  //
  //   const reader = new FileReader()
  //   reader.addEventListener('load', () => {
  //     setImagePreview(reader.result as string)
  //     setImageFile(event.target.files)
  //
  //     URL.revokeObjectURL(reader.result as string)
  //   })
  //   reader.readAsDataURL(file)
  // }
  //
  // const onSubmit = async (data: WarehouseProps) => {
  //   // if (!data) return
  //
  //   if (!setImagePreview) {
  //     toast.error('이미지를 등록해주세요.')
  //     return
  //   }
  //
  //   if (imageFile && imageFile.length > 0) {
  //     let file = imageFile[0]
  //     await uploadS3(file)
  //   }
  //
  //   const params: StorageParam = {
  //     name: data.name,
  //     description: data.description,
  //     imgUrl: (imageFile && imageFile[0].name) ?? data.imgUrl,
  //     address: address.value,
  //     coord: {
  //       longitude: address.coords.longitude || (currentItem && currentItem.coord.longitude)!,
  //       latitude: address.coords.latitude || (currentItem && currentItem.coord.latitude)!,
  //     },
  //   }
  //
  //   const editParameters = () => {
  //     const { coord, address, ...newParams } = params
  //     return { ...newParams, storageId: seq || '' }
  //   }
  //
  //   isEditMode ? mutateModify(editParameters()) : mutateSave(params)
  // }

  // useEffect(() => {
  //   reset({ ...currentItem })
  //   if (isEditMode) {
  //     query.invalidateQueries([WAREHOUSE.상세])
  //   }
  // }, [currentItem])
  //
  // useEffect(() => {
  //   if (_storageInfo && currentItem) {
  //     setAddress({ value: currentItem.address, coords: { ...currentItem.coord } })
  //     setValue('imgUrl', currentItem.imgUrl)
  //     setImagePreview(currentItem.imgUrl)
  //   }
  // }, [currentItem])

  // const onClickStep = (event: MouseEvent) => {
  //   if (event === undefined && address.value === '') {
  //     setAddress({
  //       value: '',
  //       coords: {
  //         longitude: null,
  //         latitude: null,
  //       },
  //     })
  //   } else {
  //     setAddress(address)
  //     setValue('address', address.value)
  //   }
  //   setStep(STEP.위치정보)
  // }

  return (
    <>
      <BackHeader canGoBack title={`창고 ${isEditMode ? '편집' : '생성'}`} />
      {/* <form className='mt-12 space-y-4 p-2' onSubmit={handleSubmit(onSubmit)}> */}
      {/*  <div className={'relative h-full w-full'}> */}
      {/*    <InputFile */}
      {/*      id='file' */}
      {/*      dotted */}
      {/*      styleOption={ */}
      {/*        'flex h-48 w-full items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-600 hover:border-[#32D7A0] hover:text-[#32D7A0]' */}
      {/*      } */}
      {/*      {...register('imgUrl')} */}
      {/*      onChange={event => onUpload(event)} */}
      {/*    /> */}
      {/*    {imageFile ? ( */}
      {/*      <Image */}
      {/*        src={URL.createObjectURL(imageFile[0])} */}
      {/*        defaultValue={imagePreview} */}
      {/*        width={'100'} */}
      {/*        height={'100'} */}
      {/*        alt='이미지 미리보기' */}
      {/*        className={'absolute left-0 top-0 -z-10 h-48 w-full object-cover'} */}
      {/*      /> */}
      {/*    ) : ( */}
      {/*      <Image */}
      {/*        src={ */}
      {/*          currentItem */}
      {/*            ? `https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/upload/warehouse/${encodeURIComponent( */}
      {/*                currentItem.imgUrl */}
      {/*              )}` */}
      {/*            : 'https://naejango-s3-image.s3.ap-northeast-2.amazonaws.com/assets/bg-white.png' */}
      {/*        } */}
      {/*        width={'100'} */}
      {/*        height={'100'} */}
      {/*        alt='아이템 이미지' */}
      {/*        className={'absolute left-0 top-0 -z-10 h-48 w-full object-cover'} */}
      {/*      /> */}
      {/*    )} */}
      {/*  </div> */}
      {/*  <InputField */}
      {/*    type='text' */}
      {/*    register={register('name', { required: '창고명을 입력해주세요.' })} */}
      {/*    label='창고명' */}
      {/*    placeholder='창고명' */}
      {/*    essential */}
      {/*  /> */}
      {/*  <p className='!mt-1.5 text-xs text-red-400'>{errors.name?.message}</p> */}
      {/*  <TextArea */}
      {/*    register={register('description', { required: '창고설명을 입력해주세요.' })} */}
      {/*    label='창고설명' */}
      {/*    placeholder='창고설명' */}
      {/*    essential */}
      {/*  /> */}
      {/*  <p className='!mt-0 text-xs text-red-400'>{errors.description?.message}</p> */}
      {/*  <div className={'!mt-4'}> */}
      {/*    {step === STEP.위치정보 && ( */}
      {/*      <InputField */}
      {/*        label={'위치'} */}
      {/*        placeholder={'지역설정안함'} */}
      {/*        type='text' */}
      {/*        readOnly */}
      {/*        essential */}
      {/*        disabled={isEditMode} */}
      {/*        className={cls('!indent-6')} */}
      {/*        register={register('address', { required: '지역을 설정해주세요.' })} */}
      {/*        onClick={() => setStep(STEP.위치선택)} */}
      {/*        icon={ */}
      {/*          <> */}
      {/*            <Image src={mapIcon} alt={'지도 아이콘'} className='absolute ml-2.5 text-sm text-[#A9A9A9]' /> */}
      {/*            <GrFormNext */}
      {/*              className='absolute right-2 cursor-pointer text-xl text-[#A9A9A9]' */}
      {/*              onClick={() => { */}
      {/*                if (isEditMode) return */}
      {/*                setStep(STEP.위치선택) */}
      {/*              }} */}
      {/*            /> */}
      {/*          </> */}
      {/*        } */}
      {/*      /> */}
      {/*    )} */}
      {/*    {step === STEP.위치선택 && ( */}
      {/*      <SelectCoordinate address={address} setAddress={setAddress} onClick={onClickStep} /> */}
      {/*    )} */}
      {/*  </div> */}
      {/*  <p className='!mt-1.5 text-xs text-red-400'>{errors.address?.message}</p> */}
      {/*  <Button type={'submit'} text={`${isEditMode ? '수정' : '등록'}`} /> */}
      {/* </form> */}
    </>
  )
}

export default WarehouseEdit
