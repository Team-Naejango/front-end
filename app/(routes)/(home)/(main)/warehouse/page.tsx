'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { LuEdit2 } from 'react-icons/lu'
import { toast } from 'react-hot-toast'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/navigation'

import Layout from '@/app/components/template/main/layout/Layout'
import WareHouseCarousel from '@/app/components/organism/warehouse/WareHouseCarousel'
import FloatingButton from '@/app/components/atom/FloatingButton'
import useCustomRouter from '@/app/hooks/useCustomRouter'
import { CRUD, MODAL_TYPES } from '@/app/libs/client/constants/code'
import { WAREHOUSE } from '@/app/libs/client/reactQuery/queryKey/warehouse'
import { modalSelector } from '@/app/store/modal'
import { useModal } from '@/app/hooks/useModal'
import CustomModal from '@/app/components/molecule/modal/CustomModal'

import { deleteStorage, storage } from '@/app/apis/domain/warehouse/warehouse'

interface PathParam {
  pathname: string
  query: { crud: string; seq: number | null }
}

const WareHouse = () => {
  const router = useRouter()
  const { push } = useCustomRouter()
  const { openModal } = useModal()
  const query = useQueryClient()
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
  const _delete = useRecoilValue(modalSelector('delete'))
  // 창고 조회
  const { data: { data: _storageInfo } = {} } = useQuery([WAREHOUSE.조회], () => storage(), {
    // enabled: !!seq,
  })
  const { count, storageList } = _storageInfo || {}
  const currentItem = storageList && storageList[currentSlideIndex]
  console.log('_storageInfo:', _storageInfo)

  let params: PathParam = {
    pathname: '',
    query: { crud: '', seq: null },
  }
  const onBlockedButton = (event: React.MouseEvent) => {
    event.preventDefault()
    if (_storageInfo === undefined || count === 0) return

    params = {
      pathname: `/warehouse/${currentSlideIndex + 1}`,
      query: {
        crud: CRUD.수정,
        seq: currentSlideIndex + 1,
      },
    }
  }

  const onCreate = () => {
    const params: { crud: string; seq: null } = {
      crud: CRUD.등록,
      seq: null,
    }
    push({
      pathname: `/warehouse/${count! + 1}`,
      query: params,
    })
  }

  const onDelete = () => {
    if (count === 0) return

    openModal({
      modal: {
        id: 'delete',
        type: MODAL_TYPES.CONFIRM,
        title: '창고삭제',
        content: '창고를 삭제 하시겠습니까?',
      },
      callback: async () => {
        await deleteStorage(String(storageList && storageList[currentSlideIndex].id))
        await query.invalidateQueries([WAREHOUSE.조회])
        toast.success('창고가 삭제되었습니다.')
        router.push('/warehouse')
      },
    })
  }

  const onSlideChange = (index: number) => {
    setCurrentSlideIndex(index)
  }

  return (
    <Layout hasHeader seoTitle={'창고공간'}>
      <div className={'relative h-full w-full'}>
        <div className='flex flex-col justify-center'>
          <WareHouseCarousel datas={_storageInfo || undefined} onClick={onCreate} onSlideChange={onSlideChange} />
          <h2 className={'mb-4 mt-16 text-center text-lg font-bold'}>창고 정보</h2>
          <div className={'h-auto w-full rounded-xl bg-[#f5f5f5] px-8 py-4 text-center'}>
            <div className='mx-auto my-4 grid grid-cols-1 grid-rows-[minmax(0,1fr)] items-center justify-center gap-x-3 gap-y-8'>
              <div className={'flex w-full items-center gap-12 text-left'}>
                <ul className={'flex-1'}>
                  <li className={'text-xs'}>이름</li>
                  {currentItem && (
                    <li className={'mt-1 text-[13px] font-medium'}>{storageList[currentSlideIndex].name}</li>
                  )}
                </ul>
                <ul className={'flex-1'}>
                  <li className={'text-xs'}>위치</li>
                  {currentItem && (
                    <li className={'mt-1 text-[13px] font-medium'}>{storageList[currentSlideIndex].address}</li>
                  )}
                </ul>
              </div>
              <div className={'flex w-full items-center gap-12 text-left'}>
                <ul className={'flex-1'}>
                  <li className={'text-xs'}>생성일</li>
                  {/* {currentItem && <li className={'mt-1 text-[13px] font-medium'}>{storageList[currentSlideIndex].createAt}</li>} */}
                </ul>
                <ul className={'flex-1'}>
                  <li className={'text-xs'}>소개</li>
                  {currentItem && (
                    <li className={'mt-1 text-[13px] font-medium'}>{storageList[currentSlideIndex].description}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <FloatingButton
            href={{ ...params }}
            className={`${count === 0 ? 'cursor-not-allowed bg-[#ddd]' : ''}`}
            onClick={event => onBlockedButton(event)}>
            <span className={'text-xs'}>
              <LuEdit2 fontSize={'21'} />
            </span>
          </FloatingButton>
        </div>
        <div className={'absolute right-16 top-3 mx-1 rounded border border-[#ccc] px-1.5 py-1 hover:border-[#32D7A0]'}>
          <Link href={'/warehouse/point'}>
            <span className={'inline-block text-[13px]'}>포인트 충전</span>
          </Link>
        </div>
        <div
          role={'presentation'}
          className={`absolute right-0 top-3 cursor-pointer rounded border border-[#ccc] px-1.5 py-1 hover:border-[#32D7A0] ${
            count === 0 ? 'cursor-not-allowed bg-[#ddd]' : ''
          }`}
          onClick={onDelete}>
          <span className={'inline-block text-[13px]'}>창고삭제</span>
        </div>
      </div>

      {_delete.modal.show ? <CustomModal id={_delete.modal.id} type={MODAL_TYPES.DIALOG} /> : null}
    </Layout>
  )
}

export default WareHouse